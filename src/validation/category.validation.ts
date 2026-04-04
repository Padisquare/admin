import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z
    .string()
    .max(200, "Description is too long")
    .optional()
    .or(z.literal("")),
  parentCategoryId: z.string().optional().or(z.literal("")),
  isActive: z.boolean(),
});

export const addCategorySchema = categorySchema.omit({ isActive: true });

export type CategoryFormData = z.infer<typeof categorySchema>;
export type AddCategoryFormData = z.infer<typeof addCategorySchema>;
