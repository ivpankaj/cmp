import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
interface PaymentStatusRequest {
    order_id: string;
  }
export async function POST(req: NextRequest) {
    try {
      const { order_id }: PaymentStatusRequest = await req.json();
      
      if (!order_id) {
        return NextResponse.json(
          { error: "Missing order_id parameter" },
          { status: 400 }
        );
      }
  
      const mongoClient = await clientPromise;
      const db = mongoClient.db(process.env.MONGODB_DB_NAME);
      
      // Find the order
      const order = await db.collection("orders").findOne({ orderId: order_id });
      
      if (!order) {
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }
  
      // Start a session for transaction
      const session = mongoClient.startSession();
      
      try {
        await session.withTransaction(async () => {
          // Update user's balance
          await db.collection("users").updateOne(
            { email: order.customerEmail },
            { $inc: { balance: order.orderAmount } },
            { session }
          );
  
          // Log the transaction
          await db.collection("transactions").insertOne({
            userEmail: order.customerEmail,
            type: "credit",
            amount: order.orderAmount,
            date: new Date(),
            source: "payment",
            orderId: order_id,
          }, { session });
  
          // Update order status
          await db.collection("orders").updateOne(
            { orderId: order_id },
            { $set: { status: "completed", completedAt: new Date() } },
            { session }
          );
        });
  
        return NextResponse.json({
          success: true,
          message: "Payment processed successfully"
        });
      } catch (error) {
        console.error("Transaction error:", error);
        return NextResponse.json(
          { error: "Failed to process payment" },
          { status: 500 }
        );
      } finally {
        await session.endSession();
      }
    } catch (error) {
      console.error("Payment status processing error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }