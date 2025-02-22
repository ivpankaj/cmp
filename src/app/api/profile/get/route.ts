import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/app/lib/mongodb";
import { authOptions } from "../../auth/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to access this resource" },
        { status: 401 }
      );
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);
    const userProfile = await db.collection("users").findOne(
      { email: session.user.email },
      {
        projection: {
          _id: 0,
          email: 1,
          bio: 1,
          name: 1,
          balance: 1,
          social: 1,
          emailVerified: 1,
          updatedAt: 1,
          phone: 1,
          referralCode: 1,
        },
      }
    );

    if (!userProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Ensure the response contains only plain objects
    const sanitizedProfile = {
      ...userProfile,
      balance: userProfile.balance || 0, // Ensure balance is always defined
    };

    return NextResponse.json(sanitizedProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching your profile" },
      { status: 500 }
    );
  }
}