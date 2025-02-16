import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import clientPromise from '@/app/lib/mongodb';
import { authOptions } from '../../auth/authOptions';

// In your API route
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);

    // Updated MongoDB query to include phone
    await db.collection('users').updateOne(
      { email: session.user.email },
      {
        $set: {
          name: data.name,
          bio: data.bio,
          skills: data.skills,
          social: data.social,
          phone: data.phone, // Add phone field
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      updatedSession: {
        ...session.user,
        name: data.name,
        bio: data.bio,
        skills: data.skills,
        social: data.social,
        phone: data.phone, // Include phone in response
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}