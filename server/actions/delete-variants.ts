"use server";
import { createSafeActionClient } from "next-safe-action";
import * as z from "zod";
import { db } from "..";
import { productVariants } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { algoliasearch } from "algoliasearch";

const action = createSafeActionClient();

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID!,
  process.env.ALOGOLIA_ADMIN!
);

export const deleteVariant = action(
  z.object({ id: z.number() }),
  async ({ id }) => {
    try {
      const deleteVariant = await db
        .delete(productVariants)
        .where(eq(productVariants.id, id))
        .returning();
      client.deleteObject({indexName:"products",  objectID:deleteVariant[0].id.toString()});
      revalidatePath("/dashboard/products");
      return { success: `Deleted  ${deleteVariant[0].productType}` };
    } catch (error) {
      console.log(error);
      return { error: "Failed to delete variant" };
    }
  }
);
