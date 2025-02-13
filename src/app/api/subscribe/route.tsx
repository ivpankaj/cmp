// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);
    const subscribersCollection = db.collection("subscribers");

    // Check if the email already exists
    const existingSubscriber = await subscribersCollection.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      );
    }

    // Save the email to the database
    await subscribersCollection.insertOne({
      email,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Subscription successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}