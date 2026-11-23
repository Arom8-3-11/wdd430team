import { z } from "zod";

export const ASSIGNMENT_STATUSES = ["todo", "in-progress", "done"] as const;

export const assignmentSchema = z.object({
  title: z
    .string("Title is required.")
    .trim()
    .min(3, "Title must have at least 3 characters.")
    .max(100, "Title must have at most 100 characters."),
  description: z
    .string()
    .trim()
    .max(500, "Description must have at most 500 characters.")
    .default(""),
  dueDate: z
    .string("Due date is required.")
    .datetime({ offset: true, message: "Due date must be a valid ISO date." }),
  status: z.enum(ASSIGNMENT_STATUSES).default("todo"),
});

export type AssignmentInput = z.infer<typeof assignmentSchema>;
