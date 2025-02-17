// pages/api/apply-referral.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/app/lib/mongodb";
import { authOptions } from "../auth/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { referralCode } = await request.json();
    const trimmedReferralCode = referralCode.trim();

    if (!trimmedReferralCode) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);
    const referrer = await db.collection("users").findOne({
      referralCode: trimmedReferralCode,
    });

    if (!referrer) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 400 }
      );
    }
    const currentUser = await db.collection("users").findOne({
      email: session.user.email,
    });

    if (
      currentUser?.used_referral_codes &&
      currentUser.used_referral_codes.includes(trimmedReferralCode)
    ) {
      return NextResponse.json(
        { error: "You have already used this referral code" },
        { status: 400 }
      );
    }
    const bonusAmount = 100;
    await db.collection("users").updateOne(
      { email: session.user.email },
      {
        $push: { used_referral_codes: trimmedReferralCode },
        $inc: { balance: bonusAmount },
      }
    );

    await db.collection("users").updateOne(
      { referralCode: trimmedReferralCode },
      {
        $inc: { balance: 50 }, 
      }
    );

    // Log the transaction for the current user
    await db.collection("transactions").insertOne({
        userEmail: session.user.email,
        type: "credit",
        amount: bonusAmount,
        date: new Date(), // Ensure this is a Date object
        source: "referral",
        referralDetails: {
          referrerEmail: referrer.email,
          referrerName: referrer.name,
          referralCode: trimmedReferralCode,
        },
      });
    await db.collection("transactions").insertOne({
      userEmail: referrer.email,
      type: "credit",
      amount: 50, // Referrer's reward
      date: new Date(),
      source: "referral-reward",
      referralDetails: {
        referredUserEmail: session.user.email,
        referredUserName: currentUser?.name || "Unknown",
        referralCode: trimmedReferralCode,
      },
    });

    return NextResponse.json({
      success: true,
      bonus: bonusAmount,
      newBalance: (currentUser?.balance || 0) + bonusAmount,
    });
  } catch (error) {
    console.error("Error applying referral code:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}