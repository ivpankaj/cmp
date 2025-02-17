/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import clientPromise from "@/app/lib/mongodb";

// Environment and configuration
const APP_ID = process.env.CASHFREE_APP_ID!;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;
const BASE_URL = process.env.CASHFREE_ENVIRONMENT === "production" 
  ? "https://api.cashfree.com"
  : "https://sandbox.cashfree.com";

// Types
interface OrderDetails {
  orderId: string;
  orderAmount: number;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

// API handlers
export async function createPayment(req: NextRequest) {
  try {
    const orderDetails: OrderDetails = await req.json();
    
    // Validate required fields
    const requiredFields = ['orderId', 'orderAmount', 'customerId', 'customerName', 'customerEmail', 'customerPhone'];
    for (const field of requiredFields) {
      if (!orderDetails[field as keyof OrderDetails]) {
        return NextResponse.json(
          { error: `Missing required parameter: ${field}` },
          { status: 400 }
        );
      }
    }

    // Store order in MongoDB
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);
    
    await db.collection("orders").insertOne({
      orderId: orderDetails.orderId,
      orderAmount: orderDetails.orderAmount,
      customerEmail: orderDetails.customerEmail,
      customerName: orderDetails.customerName,
      customerPhone: orderDetails.customerPhone,
      status: "pending",
      createdAt: new Date()
    });

    // Create payment order with Cashfree
    const response = await axios.post(
      `${BASE_URL}/pg/orders`,
      {
        order_id: orderDetails.orderId,
        order_amount: orderDetails.orderAmount,
        order_currency: "INR",
        customer_details: {
          customer_id: orderDetails.customerId,
          customer_name: orderDetails.customerName,
          customer_email: orderDetails.customerEmail,
          customer_phone: orderDetails.customerPhone,
        },
        order_meta: {
          return_url: `${process.env.NEXTAUTH_URL}/payment-status?order_id=${orderDetails.orderId}`
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-09-01",
          "x-client-id": APP_ID,
          "x-client-secret": SECRET_KEY
        }
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Payment creation error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || "Internal server error" },
      { status: 500 }
    );
  }
}