"use server";

import { db } from "@/server/";


export default async function getPosts() {
  const posts = await db.query.posts.findMany();

  if (!posts) {
    return { error: "No Posts found" };
  }

  return { success: posts };
}
