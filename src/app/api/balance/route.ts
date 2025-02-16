import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import clientPromise from '@/app/lib/mongodb';
import { authOptions } from '../auth/authOptions';

export async function GET()  {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);

    const user = await db.collection('users').findOne(
      { email: session.user.email },
      { projection: { _id: 0, balance: 1 } }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ balance: user.balance || 0 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error checking balance:', error.message, error.stack);
    } else {
      console.error('Error checking balance:', error);
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}