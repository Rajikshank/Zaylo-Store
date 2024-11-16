import { z } from "zod";
export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  image: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(8)),
  newpassword: z.optional(z.string().min(8)),
});
