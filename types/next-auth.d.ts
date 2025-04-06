// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;  // Add the role here
    };
  }

  interface User extends DefaultUser {
    role?: string;  // Add the role here as well
  }
}
