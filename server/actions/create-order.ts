"use server";

import { createOrderSchema } from "@/types/order-schema";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { orderProduct, orders } from "../schema";

const action = createSafeActionClient();

export const createOrder = action(
  createOrderSchema,
  async ({ products, status, total, paymentIntetnID }) => {
    const user = await auth();

    if (!user) return { error: "user not found" };

    const order = await db
      .insert(orders)
      .values({
        status,
        total,
        userID: user.user.id,
        paymentIntetnID,
      })
      .returning();

    const orderProducts = products.map(
      async ({ productID, quantity, variantID }) => {
        const ordereachproduct = await db
          .insert(orderProduct)
          .values({
            quantity: quantity,
            orderID: order[0].id,
            productID: productID,
            productVariantID: variantID,
          })
          .returning();
      }
    );
    return { success: "Order has been added" };
  }
);
