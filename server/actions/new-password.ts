"use server";

import { NewPasswordSchema } from "@/types/new-passwordschema";
import { createSafeActionClient } from "next-safe-action";
import { getPasswordResettokenByToken } from "./tokens";
import { db } from "..";
import { eq } from "drizzle-orm";
import { PasswordResetTokens, users } from "../schema";
import bcrypt from "bcrypt";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

const action = createSafeActionClient();

export const newPassword = action(
  NewPasswordSchema,
  async ({ password, token }) => {
    const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

    const dbPool = drizzle({ client: pool });
    if (!token) {
      return { error: "Missing Token" };
    }
    console.log("password toke", token);
    const existingToken = await getPasswordResettokenByToken(token);

    if (!existingToken) {
      return { error: "Token not found" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) return { error: "Token has  expired" };
    const exisitingUser = await db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    });

    if (!exisitingUser) return { error: "user not found" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await dbPool.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.id, exisitingUser.id));
      await tx
        .delete(PasswordResetTokens)
        .where(eq(PasswordResetTokens.id, existingToken.id));
    });
    return { success: "password updated" };
  }
);
