"use server";

 
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { discounts } from "../schema";
import { revalidatePath } from "next/cache";
import { discountSchema } from "@/types/discount-schema";

const action = createSafeActionClient();
export const createDiscount = action(
  discountSchema,
  async ({ productID, url, id, discount }) => {
    try {
      // if (id) {
      //   const currentProduct = await db.query.discounts.findFirst({
      //     where: eq(discounts.id, id),
      //   });
      //   if (!currentProduct) return { error: "Discount not found" };

      //   const editedDiscount = await db
      //     .update(discounts)
      //     .set({
      //       url,
      //       discount,
      //     })
      //     .returning()
      //     .where(eq(discounts.id, id));
      //   revalidatePath("/dashboard/products");
      //   return {
      //     success: `Product ${editedDiscount[0].discount} has been edited`,
      //   };
      // }

      if (productID) {
        const newProduct = await db
          .insert(discounts)
          .values({
            discount,
            url,
            productID,
          })
          .returning();
        revalidatePath("/dashboard/products");
        return { success: `Discount ${newProduct[0].discount} Added` };
      }
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  }
);
