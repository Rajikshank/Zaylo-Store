"use server";

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";

const action = createSafeActionClient();
export const emailSignIn = action(
  LoginSchema,
  async ({ email, password, code }) => {

    const exsitingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (exsitingUser?.email != email) {
      return { error: "Email not found" };
    }

    // if(exsitingUser.emailVerified){
    //     return {error:""}
    // }

    return { success: email };
  }
);
