import * as z from "zod";

export const discountSchema = z.object({
  id: z.number().optional(),
  discount: z.coerce
    .number()
    .positive({ message: "price must be a positive number" }),
  productID: z.number(),
  url: z.string().refine((url) => url.search("blob:") !== 0, {
    message: "Please wait for the image to upload",
  }),
});
