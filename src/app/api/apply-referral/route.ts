// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import clientPromise from "@/app/lib/mongodb";
// import { authOptions } from "../auth/authOptions";

// export async function POST(request: Request) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { referralCode } = await request.json();
//     const trimmedReferralCode = referralCode.trim();

//     if (!trimmedReferralCode) {
//       return NextResponse.json(
//         { error: "Referral code is required" },
//         { status: 400 }
//       );
//     }

//     console.log("Received referral code:", trimmedReferralCode);

//     const mongoClient = await clientPromise;
//     const db = mongoClient.db(process.env.MONGODB_DB_NAME);

//     // Check if the referral code exists and is valid
//     const referrer = await db.collection("users").findOne({
//       referralCode: trimmedReferralCode, // Match the field name in the database
//     });

//     if (!referrer) {
//       return NextResponse.json(
//         { error: "Invalid referral code" },
//         { status: 400 }
//       );
//     }

//     // Check if the current user has already used this specific referral code
//     const currentUser = await db.collection("users").findOne({
//       email: session.user.email,
//     });

//     if (
//       currentUser?.used_referral_codes &&
//       currentUser.used_referral_codes.includes(trimmedReferralCode)
//     ) {
//       return NextResponse.json(
//         { error: "You have already used this referral code" },
//         { status: 400 }
//       );
//     }

//     // Apply bonus to the current user
//     const bonusAmount = 100; // Example bonus amount
//     await db.collection("users").updateOne(
//       { email: session.user.email },
//       {
//         $push: { used_referral_codes: trimmedReferralCode }, // Add the referral code to the array
//         $inc: { balance: bonusAmount }, // Increment the balance
//       }
//     );

//     // Optionally reward the referrer
//     await db.collection("users").updateOne(
//       { referralCode: trimmedReferralCode },
//       {
//         $inc: { balance: 50 }, // Example reward for referrer
//       }
//     );

//     return NextResponse.json({
//       success: true,
//       bonus: bonusAmount,
//       newBalance: (currentUser?.balance || 0) + bonusAmount,
//     });
//   } catch (error) {
//     console.error("Error applying referral code:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

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

    // Check if the referral code exists and is valid
    const referrer = await db.collection("users").findOne({
      referralCode: trimmedReferralCode,
    });

    if (!referrer) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 400 }
      );
    }

    // Check if the current user has already used this specific referral code
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

    // Apply bonus to the current user
    const bonusAmount = 100; // Example bonus amount
    await db.collection("users").updateOne(
      { email: session.user.email },
      {
        $push: { used_referral_codes: trimmedReferralCode },
        $inc: { balance: bonusAmount },
      }
    );

    // Optionally reward the referrer
    await db.collection("users").updateOne(
      { referralCode: trimmedReferralCode },
      {
        $inc: { balance: 50 }, // Example reward for referrer
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
    // Log the transaction for the referrer
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