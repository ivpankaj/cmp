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
    async signIn({ user }) {
      try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB_NAME);
        const usersCollection = db.collection("users");
        const existingUser = await usersCollection.findOne({ email: user.email });

        if (!existingUser) {
          let bonusCredits = 0;
          
          // Create an API route to handle referral code verification
          const verifyReferralCode = async (code: string) => {
            const referrer = await usersCollection.findOne({ referralCode: code });
            if (referrer) {
              // Update referrer's balance
              await usersCollection.updateOne(
                { referralCode: code },
                { $inc: { balance: 100 } }
              );
              return true;
            }
            return false;
          };

          // Try to get referral code from session storage
          if (typeof window !== 'undefined') {
            const refCode = sessionStorage.getItem('referralCode');
            if (refCode) {
              const isValidReferral = await verifyReferralCode(refCode);
              if (isValidReferral) {
                bonusCredits = 200;
              }
              // Clear the referral code from session storage
              sessionStorage.removeItem('referralCode');
            }
          }

          // Create new user with initial balance + bonus credits
          await usersCollection.insertOne({
            email: user.email,
            name: user.name,
            image: user.image,
            createdAt: new Date(),
            balance: 100 + bonusCredits, // Base 100 + potential 200 bonus
            referralCode: generateReferralCode(user.name || "User"),
          });

          // Log the creation for debugging
          console.log(`Created new user with balance: ${100 + bonusCredits}`);
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
