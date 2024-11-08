"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { emailtokens } from "../schema";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.emailtokens.findFirst({
      where: eq(emailtokens.token, email),
    });
    return verificationToken;
  } catch (error) {
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
    .values({ email, token, expires }).returning();

  return verificationToken;
};
