import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import clientPromise from '@/app/lib/mongodb';
import { authOptions } from '../../auth/authOptions';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to access this resource' }, 
        { status: 401 }
      );
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);

    const userProfile = await db.collection('users').findOne(
      { email: session.user.email },
      {
        projection: {
          _id: 0,
          email: 1,
          name: 1,
          balance: 1,
          emailVerified: 1,
          updatedAt: 1,
          referralCode:1
        },
      }
    );

    if (!userProfile) {
      return NextResponse.json(
        { error: 'Profile not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...userProfile,
      balance: userProfile.balance || 0, // Ensure balance is always defined
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching your profile' }, 
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' }, 
    { status: 405 }
  );
}