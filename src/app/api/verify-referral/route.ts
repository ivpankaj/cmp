import { NextRequest, NextResponse } from 'next/server';
import clientPromise from "@/app/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { referralCode } = body;

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection("users");

    const referrer = await usersCollection.findOne({ referralCode });
    
    if (referrer) {
      // Update referrer's balance
      await usersCollection.updateOne(
        { referralCode },
        { $inc: { balance: 100 } }
      );
      return NextResponse.json({ valid: true }, { status: 200 });
    }

    return NextResponse.json({ valid: false }, { status: 200 });
  } catch (error) {
    console.error('Error verifying referral:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}