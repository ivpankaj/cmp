import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Environment and configuration
const APP_ID = process.env.CASHFREE_APP_ID!;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;
const BASE_URL = process.env.CASHFREE_ENVIRONMENT === "production"
  ? "https://api.cashfree.com"
  : "https://sandbox.cashfree.com";

interface PaymentStatusRequest {
  order_id: string;
}

export async function POST(req: NextRequest) {
  try {
    console.log("Starting payment status processing...");

    // Step 1: Parse request body
    const { order_id }: PaymentStatusRequest = await req.json();
    console.log(`Received order_id: ${order_id}`);

    if (!order_id) {
      console.error("Missing order_id parameter");
      return NextResponse.json(
        { error: "Missing order_id parameter" },
        { status: 400 }
      );
    }

    // Step 2: Connect to MongoDB
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);
    console.log("Connected to MongoDB successfully");

    // Step 3: Find the order in the database
    const order = await db.collection("orders").findOne({ orderId: order_id });
    if (!order) {
      console.error(`Order not found for order_id: ${order_id}`);
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }
    console.log(`Order found in database:`, order);

    // Step 4: Verify payment status with Cashfree
    console.log("Verifying payment status with Cashfree...");
    const cashfreeResponse = await axios.get(
      `${BASE_URL}/pg/orders/${order_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-09-01",
          "x-client-id": APP_ID,
          "x-client-secret": SECRET_KEY,
        },
      }
    );
    const paymentStatus = cashfreeResponse.data.order_status;
    console.log(`Cashfree payment status response:`, cashfreeResponse.data);

    // Step 5: Handle based on payment status
    if (paymentStatus === "PAID") {
      console.log("Payment status is PAID. Processing transaction...");

      // Start a session for transaction
      const session = mongoClient.startSession();
      try {
        await session.withTransaction(async () => {
          // Update user's balance
          console.log("Updating user's balance...");
          await db.collection("users").updateOne(
            { email: order.customerEmail },
            { $inc: { balance: order.orderAmount } },
            { session }
          );
          console.log(`Updated balance for user: ${order.customerEmail}`);

          // Log the transaction
          console.log("Logging the transaction...");
          await db.collection("transactions").insertOne({
            userEmail: order.customerEmail,
            type: "credit",
            amount: order.orderAmount,
            date: new Date(),
            source: "payment",
            orderId: order_id,
          }, { session });
          console.log("Transaction logged successfully");

          // Update order status
          console.log("Updating order status to 'completed'...");
          await db.collection("orders").updateOne(
            { orderId: order_id },
            { $set: { status: "completed", completedAt: new Date() } },
            { session }
          );
          console.log("Order status updated to 'completed'");
        });

        console.log("Transaction completed successfully");
        return NextResponse.json({
          success: true,
          message: "Payment processed successfully",
        });
      } catch (error) {
        console.error("Transaction error:", error);
        return NextResponse.json(
          { error: "Failed to process payment" },
          { status: 500 }
        );
      } finally {
        await session.endSession();
        console.log("MongoDB session ended");
      }
    } else if (paymentStatus === "CANCELLED" || paymentStatus === "FAILED") {
      console.log("Payment status is CANCELLED or FAILED. Updating order status...");

      // Update order status to reflect failure/cancellation
      await db.collection("orders").updateOne(
        { orderId: order_id },
        { $set: { status: "failed", failedAt: new Date() } }
      );
      console.log("Order status updated to 'failed'");

      return NextResponse.json(
        { error: "Payment was canceled or failed" },
        { status: 400 }
      );
    } else {
      console.error(`Invalid payment status: ${paymentStatus}`);
      return NextResponse.json(
        { error: "Invalid payment status" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment status processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}