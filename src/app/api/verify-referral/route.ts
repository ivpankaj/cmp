import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "@/app/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { referralCode } = req.body;
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
      return res.status(200).json({ valid: true });
    }

    return res.status(200).json({ valid: false });
  } catch (error) {
    console.error('Error verifying referral:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}