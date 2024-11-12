"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { emailtokens, PasswordResetTokens, users } from "../schema";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.emailtokens.findFirst({
      where: eq(emailtokens.token, email),
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.delete(emailtokens).where(eq(emailtokens.id, existingToken.id));
  }

  const verificationToken = await db
    .insert(emailtokens)
    .values({ email, token, expires })
    .returning();

  return verificationToken;
};

export const newVerification = async (token: string) => {
  const exisitingToken = await getVerificationTokenByEmail(token);
  if (!exisitingToken) return { error: "Token not found" };
  const hasExpired = new Date(exisitingToken.expires) < new Date();

  if (hasExpired) return { error: "token expired" };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, exisitingToken.email),
  });

  if (!existingUser) return { error: "Email does not exist" };

  await db
    .update(users)
    .set({
      emailVerified: new Date(),
      email: exisitingToken.email,
    })
    .where(eq(users.email, exisitingToken.email));

  await db.delete(emailtokens).where(eq(emailtokens.id, exisitingToken.id));
  return { success: "Email verified" };
};

export const getPasswordResettokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.query.PasswordResetTokens.findFirst({
      where: eq(PasswordResetTokens.token, token),
    });


   
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordTokenByEmail = async (email: string) => {
  try {
    const existingToken = await db.query.PasswordResetTokens.findFirst({
      where: eq(PasswordResetTokens.email, email),
    });

    return existingToken;
  } catch {
    return null;
  }
};
export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = crypto.randomUUID();

    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordTokenByEmail(email);

    if (existingToken) {
      await db
        .delete(PasswordResetTokens)
        .where(eq(PasswordResetTokens.id, existingToken.id));
    }

    const passwordResetToken = await db
      .insert(PasswordResetTokens)
      .values({
        email: email,
        token: token,
        expires: expires,
      })
      .returning();

    return passwordResetToken;
  } catch {
    return null;
  }
};
