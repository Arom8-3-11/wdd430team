import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string({ error: "Name is required." })
    .trim()
    .min(2, { error: "Name must be at least 2 characters long." })
    .max(100, { error: "Name must be 100 characters or fewer." }),
  email: z
    .email({ error: "Please enter a valid email address." })
    .trim()
    .toLowerCase(),
  password: z
    .string({ error: "Password is required." })
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(100, { error: "Password must be 100 characters or fewer." }),
});

export const signInSchema = z.object({
  email: z
    .email({ error: "Please enter a valid email address." })
    .trim()
    .toLowerCase(),
  password: z.string({ error: "Password is required." }).min(1, {
    error: "Password is required.",
  }),
});

export const profileUpdateSchema = z
  .object({
    name: z
      .string({ error: "Name is required." })
      .trim()
      .min(2, { error: "Name must be at least 2 characters long." })
      .max(100, { error: "Name must be 100 characters or fewer." }),
    bio: z
      .string()
      .trim()
      .max(500, { error: "Bio must be 500 characters or fewer." })
      .optional(),
  })
  .strict();

export type RegisterInput = z.infer<typeof registerSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

export type FieldErrors = Record<string, string[]>;

export function fieldErrorsFromZod(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? String(issue.path[0]) : "form";
    (errors[key] ??= []).push(issue.message);
  }
  return errors;
}
