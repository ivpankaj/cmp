import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import clientPromise from '@/app/lib/mongodb';
import { authOptions } from '../../auth/authOptions';

export async function GET() {
  try {
    // Use authOptions with getServerSession to authenticate the user
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to MongoDB
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);

    // Fetch the user's profile data from MongoDB
    const userProfile = await db.collection('users').findOne(
      { email: session.user.email },
      {
        projection: {
          _id: 0, // Exclude the MongoDB `_id` field from the response
          email: 1,
          name: 1,
          bio: 1,
          skills: 1,
          social: 1,
          emailVerified:1,
          updatedAt: 1,
        },
      }
    );

    if (!userProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Return the user's profile data
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}