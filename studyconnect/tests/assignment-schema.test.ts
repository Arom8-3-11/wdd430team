import { describe, expect, it } from "vitest";
import { assignmentSchema } from "@/lib/validations/assignment";

const valid = {
  title: "Problem set 04",
  description: "Chapters 3 and 4",
  dueDate: "2026-12-01T23:59:00Z",
};

describe("assignmentSchema", () => {
  it("accepts a valid assignment and applies the default status", () => {
    const result = assignmentSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.status).toBe("todo");
  });

  it("trims the title", () => {
    const result = assignmentSchema.safeParse({ ...valid, title: "  Essay  " });
    expect(result.success && result.data.title).toBe("Essay");
  });

  it("defaults the description to an empty string", () => {
    const result = assignmentSchema.safeParse({
      title: valid.title,
      dueDate: valid.dueDate,
    });
    expect(result.success && result.data.description).toBe("");
  });

  it("rejects a title that is too short", () => {
    expect(assignmentSchema.safeParse({ ...valid, title: "ab" }).success).toBe(
      false,
    );
  });

  it("rejects a title longer than 100 characters", () => {
    const title = "a".repeat(101);
    expect(assignmentSchema.safeParse({ ...valid, title }).success).toBe(false);
  });

  it("rejects a description longer than 500 characters", () => {
    const description = "a".repeat(501);
    expect(assignmentSchema.safeParse({ ...valid, description }).success).toBe(
      false,
    );
  });

  it("rejects an invalid due date", () => {
    expect(
      assignmentSchema.safeParse({ ...valid, dueDate: "tomorrow" }).success,
    ).toBe(false);
  });

  it("rejects an unknown status", () => {
    expect(
      assignmentSchema.safeParse({ ...valid, status: "finished" }).success,
    ).toBe(false);
  });
});
