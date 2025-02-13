import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import clientPromise from '@/app/lib/mongodb';
import { authOptions } from '../../auth/authOptions';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);

    // Fetch user profile from MongoDB
    const userProfile = await db.collection('users').findOne(
      { email: session.user.email },
      { projection: { _id: 0, email: 0 } } // Exclude unnecessary fields
    );

    // Return profile data (or default if not found)
    return NextResponse.json(userProfile || {
      name: '',
      bio: '',
      skills: [],
      social: { linkedin: '', github: '', twitter: '' },
      emailVerified: false,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}