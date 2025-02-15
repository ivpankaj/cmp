import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";
import { NextAuthOptions } from "next-auth";

// Helper function to generate a referral code
function generateReferralCode(name: string): string {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
  const formattedName = name
    .split(" ") // Split the name into parts
    .map((part) => part.charAt(0).toUpperCase()) // Take the first letter of each part
    .join(""); // Join the initials together
  return `${formattedName}${randomNumber}`; // Combine initials with the random number
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
          // New user, check for referral code
          const referralCode = account?.providerAccountId; // Assuming referral code is passed here
          let bonusCredits = 0;
  
          if (referralCode) {
            const referrer = await usersCollection.findOne({ referralCode });
            if (referrer) {
              bonusCredits = 200; // Award 200 credits for valid referral
            }
          }
  
          // Create new user with initial balance + bonus credits
          await usersCollection.insertOne({
            email: user.email,
            name: user.name,
            image: user.image,
            createdAt: new Date(),
            balance: 100 + bonusCredits, // Initial balance + bonus
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