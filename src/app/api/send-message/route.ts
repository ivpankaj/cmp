/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

interface Message {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { name, email, message }: Message = await request.json();

    // Validate input fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME as string);

    // Insert the message into the "messages" collection
    const messagesCollection = db.collection("messages");
    const result = await messagesCollection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    // Respond with success
    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}