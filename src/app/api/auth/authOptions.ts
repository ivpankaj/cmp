import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";
import { NextAuthOptions, User as NextAuthUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface CustomUser extends NextAuthUser {
    referralCode?: string;
    createdAt?: Date;
    balance?: number;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      referralCode?: string;
      createdAt?: Date;
      balance?: number;
    } & CustomUser;
  }
}

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
        const existingUser = await usersCollection.findOne({
          email: { $regex: new RegExp(`^${user.email}$`, 'i') }
        });

        if (!existingUser) {
          let initialBalance = 100; 
          let referrerCode = null;

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
            const referrerUpdate = await usersCollection.findOneAndUpdate(
              { referralCode: referrerCode },
              { $inc: { balance: 100 } },
              { returnDocument: 'after' }
            );

            if (referrerUpdate.value) {
              initialBalance += 200; 
              console.log(`Applied referral bonus. New balance: ${initialBalance}`);
            }
          }

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
      // Add custom fields to the session
      if (session?.user) {
        session.user.id = token.sub as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        
        // Fix: Use optional chaining and provide default values
        session.user.referralCode = token.referralCode as string || "";
        session.user.createdAt = token.createdAt ? new Date(token.createdAt as string) : undefined;
        session.user.balance = (token.balance as number) || 0;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // Initial sign in
        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB_NAME);
        const usersCollection = db.collection("users");
        const dbUser = await usersCollection.findOne({ email: user.email });

        if (dbUser) {
          token.referralCode = dbUser.referralCode;
          token.balance = dbUser.balance;
          token.createdAt = dbUser.createdAt?.toISOString();
        }
      } else if (trigger === "update" && session?.user) {
        // Handle token updates
        token.referralCode = session.user.referralCode;
        token.balance = session.user.balance;
        token.createdAt = session.user.createdAt?.toISOString();
      }

      return token;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};