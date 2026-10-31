import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "./mongodb";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, 
    minPasswordLength: 6,
  },
  plugins: [
    jwt(),
    nextCookies(), 
  ],
});