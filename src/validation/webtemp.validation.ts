import z from "zod";

export const templateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description is too short").max(500),
  image: z.url("Please enter a valid image URL"),
  isActive: z.boolean(),
});

export type TemplateFormData = z.infer<typeof templateSchema>;
