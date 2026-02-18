import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(120, { message: "Nam must be less than 120 characters" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at less 3 characters" })
    .max(140, {
      message: "Slug must be less than 140 characters",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be lowercase and contain only letters and numbers and hyphens",
    }),
  tagline: z.string().max(200, {
    message: "Tagline must be less than 200 characters",
  }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(2000, { message: "Description must be less than 2000 characters" }),

  websiteUrl: z
    .string()
    .url({ message: "Please enter a valid URL (e.g. https://yourproduct.com)" })
    .optional(),

  tag: z
    .array(z.string().min(1))
    .min(1, { message: "At least one tag is required" })
    .max(10, { message: "Maximum 10 tags allowed" }),
});
