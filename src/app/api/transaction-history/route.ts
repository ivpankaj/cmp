// pages/api/transaction-history.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/app/lib/mongodb";
import { authOptions } from "../auth/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);

    // Fetch all transactions for the logged-in user
    const transactions = await db
      .collection("transactions")
      .find({ userEmail })
      .sort({ date: -1 }) // Sort by date (newest first)
      .toArray();

    // Convert MongoDB ObjectId to string and format dates
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      _id: transaction._id.toString(),
      date: transaction.date.toISOString(),
    }));

    return NextResponse.json({ transactions: formattedTransactions });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}