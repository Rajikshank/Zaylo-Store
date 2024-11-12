"use server";

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";

import { AuthError } from "next-auth";
import { signIn } from "@/server/auth";
// import { redirect } from "next/navigation";

const action = createSafeActionClient();
export const emailSignIn = action(
  LoginSchema,
  async ({ email, password, code }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email != email) {
        return { error: "Email not found" };
      }

      // if(exsitingUser.emailVerified){
      //     return {error:""}
      // }

      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser.email
        );
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );

        return { success: "Email Sent" };
      }

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return { success: email };
    } catch (error) {
      console.log("error happened", error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email or password incorrect" };
          case "AccessDenied":
            return { error: error.message };
          case "OAuthSignInError":
            return { error: error.message };

          default:
            return { error: error.message };
        }
      }
      throw error;
    }
  }
);
