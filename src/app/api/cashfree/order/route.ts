/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const APP_ID = process.env.CASHFREE_APP_ID!;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;
const ENV = process.env.CASHFREE_ENVIRONMENT === "production"
  ? "https://api.cashfree.com"
  : "https://sandbox.cashfree.com";

export async function POST(req: NextRequest) {
    try {
        const { orderId, orderAmount, customerId, customerName, customerEmail, customerPhone } = await req.json();

        if (!orderId || !orderAmount || !customerId || !customerName || !customerEmail || !customerPhone) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
        }

        console.log("Using Cashfree API:", ENV);
        console.log("Sending Request with:", {
            order_id: orderId,
            order_amount: orderAmount,
            order_currency: "INR",
            customer_details: {
                customer_id: customerId,
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: customerPhone,
            },
            order_meta: {
                return_url: `${process.env.NEXTAUTH_URL2}/payment-status?order_id=${orderId}`
            }
        });

        const response = await axios.post(`${ENV}/pg/orders`, {
            order_id: orderId,
            order_amount: orderAmount,
            order_currency: "INR",
            customer_details: {
                customer_id: customerId,
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: customerPhone,
            },
            order_meta: {
                return_url: `${process.env.NEXTAUTH_URL2}/payment-status?order_id=${orderId}`
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-api-version": "2022-09-01",
                "x-client-id": APP_ID,
                "x-client-secret": SECRET_KEY
            }
        });

        console.log("Cashfree API Response:", response.data);
        return NextResponse.json(response.data, { status: 200 });

    } catch (error: any) {
        console.error("Cashfree API Error:", error.response?.data || error.message);
        return NextResponse.json({ error: error.response?.data || error.message }, { status: 500 });
    }
}
