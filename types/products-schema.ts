import * as z from "zod";

export const ProductSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(5, { message: "Title must 5 Charactors long" }),
  description: z.string().min(40, {
    message: "Description must be at least 40 characters long",
  }),
  price: z.coerce
    .number()
    .positive({ message: "price must be a positive number" }),
});


export type ZProducstSchema =z.infer <typeof ProductSchema>