import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";
import { NextAuthOptions } from "next-auth";

function generateReferralCode(name: string): string {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const formattedName = name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return `${formattedName}${randomNumber}`;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB_NAME);
        const usersCollection = db.collection("users");

        // Find existing user
        const existingUser = await usersCollection.findOne({
          email: { $regex: new RegExp(`^${user.email}$`, 'i') }
        });

        if (!existingUser) {
          let initialBalance = 100; // Base balance
          let referrerCode = null;

          // Get referral code from URL params in the cookies
          if (account?.state) {
            try {
              const stateData = JSON.parse(account.state as string);
              referrerCode = stateData.referralCode;
              console.log("Processing referral code:", referrerCode);
            } catch (e) {
              console.error("Error parsing state:", e);
            }
          }

          if (referrerCode) {
            // Find and update referrer
            const referrerUpdate = await usersCollection.findOneAndUpdate(
              { referralCode: referrerCode },
              { $inc: { balance: 100 } },
              { returnDocument: 'after' }
            );

            if (referrerUpdate.value) {
              initialBalance += 200; // Add referral bonus
              console.log(`Applied referral bonus. New balance: ${initialBalance}`);
            }
          }

          // Create new user with transaction
          const session = mongoClient.startSession();
          try {
            await session.withTransaction(async () => {
              const newUser = {
                email: user.email,
                name: user.name,
                image: user.image,
                createdAt: new Date(),
                balance: initialBalance,
                referralCode: generateReferralCode(user.name || "User"),
              };

              await usersCollection.insertOne(newUser, { session });
              console.log(`Created new user with balance: ${initialBalance}`);
            });
          } finally {
            await session.endSession();
          }
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
