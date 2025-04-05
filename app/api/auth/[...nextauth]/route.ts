// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt", // ✅ Must be exactly "jwt" or "database"
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
