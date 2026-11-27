import { describe, expect, it } from "vitest";
import {
  filterAssignments,
  getDashboardGroups,
  getDisplayStatus,
  getDueLabel,
  sortAssignments,
  summarizeAssignments,
  type Assignment,
} from "@/lib/assignments";
import { parseAssignmentsResponse } from "@/lib/assignments-source";
import { createSampleAssignments } from "@/lib/sample-assignments";

// Local-time dates so the tests don't depend on the machine's time zone.
const now = new Date(2026, 10, 26, 12, 0).getTime();
const at = (day: number, hour = 12) =>
  new Date(2026, 10, day, hour).toISOString();

function make(overrides: Partial<Assignment>): Assignment {
  return {
    id: "a",
    title: "Task",
    description: "",
    dueDate: at(30),
    status: "todo",
    ...overrides,
  };
}

describe("getDisplayStatus", () => {
  it("is completed when done, even if the due date has passed", () => {
    expect(
      getDisplayStatus(make({ status: "done", dueDate: at(1) }), now),
    ).toBe("completed");
  });

  it("is overdue when not done and the due date has passed", () => {
    expect(getDisplayStatus(make({ dueDate: at(25) }), now)).toBe("overdue");
    expect(
      getDisplayStatus(
        make({ status: "in-progress", dueDate: at(26, 9) }),
        now,
      ),
    ).toBe("overdue");
  });

  it("is pending when not done and due in the future", () => {
    expect(getDisplayStatus(make({ dueDate: at(26, 18) }), now)).toBe(
      "pending",
    );
  });
});

describe("getDueLabel", () => {
  it("describes days relative to today", () => {
    expect(getDueLabel(make({ dueDate: at(26, 18) }), now)).toBe("Due today");
    expect(getDueLabel(make({ dueDate: at(27) }), now)).toBe("Due tomorrow");
    expect(getDueLabel(make({ dueDate: at(30) }), now)).toBe("Due in 4 days");
    expect(getDueLabel(make({ dueDate: at(25) }), now)).toBe("1 day overdue");
    expect(getDueLabel(make({ dueDate: at(23) }), now)).toBe("3 days overdue");
    expect(getDueLabel(make({ dueDate: at(26, 9) }), now)).toBe(
      "Was due earlier today",
    );
    expect(getDueLabel(make({ status: "done" }), now)).toBe("Completed");
  });
});

describe("summaries, sorting and filtering", () => {
  const list = createSampleAssignments(now);

  it("counts each status and the completion rate", () => {
    expect(summarizeAssignments(list, now)).toEqual({
      total: 9,
      pending: 4,
      completed: 3,
      overdue: 2,
      completionRate: 33,
    });
    expect(summarizeAssignments([], now).completionRate).toBe(0);
  });

  it("sorts overdue first, then pending soonest-first, then completed", () => {
    const statuses = sortAssignments(list, now).map((a) =>
      getDisplayStatus(a, now),
    );
    expect(statuses).toEqual([
      "overdue",
      "overdue",
      "pending",
      "pending",
      "pending",
      "pending",
      "completed",
      "completed",
      "completed",
    ]);
  });

  it("filters by display status", () => {
    expect(filterAssignments(list, "overdue", now)).toHaveLength(2);
    expect(filterAssignments(list, "all", now)).toHaveLength(9);
  });

  it("groups dashboard work into needs-attention and upcoming", () => {
    const { needsAttention, upcoming } = getDashboardGroups(list, now);
    expect(needsAttention).toHaveLength(3); // 2 overdue + due today
    expect(upcoming).toHaveLength(3);
  });
});

describe("parseAssignmentsResponse", () => {
  it("reads the API envelope and skips malformed entries", () => {
    const result = parseAssignmentsResponse({
      data: [
        { title: "Essay", dueDate: "2026-12-01T10:00:00Z", status: "todo" },
        { title: "Bad date", dueDate: "nope", status: "todo" },
        { title: "Bad status", dueDate: "2026-12-01T10:00:00Z", status: "x" },
      ],
    });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: "assignment-0", description: "" });
  });

  it("throws when the envelope is wrong", () => {
    expect(() => parseAssignmentsResponse({ error: {} })).toThrow();
    expect(() => parseAssignmentsResponse(null)).toThrow();
  });
});
