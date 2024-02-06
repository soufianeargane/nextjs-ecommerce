import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
});

export type User = z.infer<typeof registerSchema>;
