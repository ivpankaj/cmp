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
    },
    async signIn({ user, account }) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB_NAME);
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email: user.email });

        if (!existingUser) {
          // Parse the state to get refCode
          let refCode;
          if (account?.state) {
            try {
              const state = typeof account.state === 'string' ? JSON.parse(account.state) : {};
              refCode = state.refCode;
            } catch (e) {
              console.error("Error parsing state:", e);
            }
          }

          let bonusCredits = 0;
          if (refCode) {
            const referrer = await usersCollection.findOne({ referralCode: refCode });
            if (referrer) {
              bonusCredits = 200;
              // Update referrer's balance
              await usersCollection.updateOne(
                { referralCode: refCode },
                { $inc: { balance: 100 } } // Give referrer 100 credits
              );
            }
          }

          // Create new user with initial balance + bonus credits
          await usersCollection.insertOne({
            email: user.email,
            name: user.name,
            image: user.image,
            createdAt: new Date(),
            balance: 100 + bonusCredits,
            referralCode: generateReferralCode(user.name || "User"),
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};