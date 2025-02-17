import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { order_id } = await request.json();

    if (!order_id ) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);

    const order = await db.collection("orders").findOne({ orderId: order_id });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order_id) {
      // Update user's balance
      await db.collection("users").updateOne(
        { email: order.customerEmail },
        { $inc: { balance: order.orderAmount } }
      );

      // Log the transaction
      await db.collection("transactions").insertOne({
        userEmail: order.customerEmail,
        type: "credit",
        amount: order.orderAmount,
        date: new Date(),
        source: "payment",
        orderId: order_id,
      });

      return NextResponse.json({ success: true, message: "Payment successful" });
    } else {
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error handling payment status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}