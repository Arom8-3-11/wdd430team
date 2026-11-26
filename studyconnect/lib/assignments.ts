import type { AssignmentInput } from "@/lib/validations/assignment";

/** Raw status stored with an assignment (matches the Zod schema). */
export type AssignmentStatus = AssignmentInput["status"];

/**
 * Status shown to the student. "overdue" is never stored: it is derived from
 * the due date, so it can't go stale.
 */
export type DisplayStatus = "pending" | "completed" | "overdue";

export type StatusFilter = DisplayStatus | "all";

export type Assignment = AssignmentInput & {
  id: string;
  /** Optional label such as "MATH 215". Not part of the API schema yet. */
  course?: string;
};

export type AssignmentSummary = {
  total: number;
  pending: number;
  completed: number;
  overdue: number;
  /** Whole number from 0 to 100. */
  completionRate: number;
};

const MS_PER_DAY = 86_400_000;

/** Whole calendar days from `now` to the due date (negative = in the past). */
export function calendarDayDiff(dueDate: string, now: number): number {
  const due = new Date(dueDate);
  const today = new Date(now);
  const dueDay = new Date(
    due.getFullYear(),
    due.getMonth(),
    due.getDate(),
  ).getTime();
  const todayDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();

  return Math.round((dueDay - todayDay) / MS_PER_DAY);
}

export function getDisplayStatus(
  assignment: Pick<Assignment, "status" | "dueDate">,
  now: number,
): DisplayStatus {
  if (assignment.status === "done") return "completed";

  return new Date(assignment.dueDate).getTime() < now ? "overdue" : "pending";
}

export function summarizeAssignments(
  assignments: readonly Assignment[],
  now: number,
): AssignmentSummary {
  const counts: Record<DisplayStatus, number> = {
    pending: 0,
    completed: 0,
    overdue: 0,
  };

  for (const assignment of assignments) {
    counts[getDisplayStatus(assignment, now)] += 1;
  }

  const total = assignments.length;
  const completionRate =
    total === 0 ? 0 : Math.round((counts.completed / total) * 100);

  return { total, ...counts, completionRate };
}

const STATUS_ORDER: Record<DisplayStatus, number> = {
  overdue: 0,
  pending: 1,
  completed: 2,
};

/**
 * Most urgent first: overdue (oldest first), then pending (soonest first),
 * then completed (most recent first).
 */
export function sortAssignments(
  assignments: readonly Assignment[],
  now: number,
): Assignment[] {
  return [...assignments].sort((a, b) => {
    const statusA = getDisplayStatus(a, now);
    const statusB = getDisplayStatus(b, now);

    if (statusA !== statusB) {
      return STATUS_ORDER[statusA] - STATUS_ORDER[statusB];
    }

    const timeA = new Date(a.dueDate).getTime();
    const timeB = new Date(b.dueDate).getTime();

    return statusA === "completed" ? timeB - timeA : timeA - timeB;
  });
}

export function filterAssignments(
  assignments: readonly Assignment[],
  filter: StatusFilter,
  now: number,
): Assignment[] {
  if (filter === "all") return [...assignments];

  return assignments.filter((a) => getDisplayStatus(a, now) === filter);
}

/** Short human phrase such as "Due tomorrow" or "3 days overdue". */
export function getDueLabel(
  assignment: Pick<Assignment, "status" | "dueDate">,
  now: number,
): string {
  const status = getDisplayStatus(assignment, now);

  if (status === "completed") return "Completed";

  const days = calendarDayDiff(assignment.dueDate, now);

  if (status === "overdue") {
    if (days === 0) return "Was due earlier today";

    const late = Math.abs(days);
    return `${late} ${late === 1 ? "day" : "days"} overdue`;
  }

  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";

  return `Due in ${days} days`;
}

const dueDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function formatDueDate(dueDate: string): string {
  const date = new Date(dueDate);

  return Number.isNaN(date.getTime())
    ? "No due date"
    : dueDateFormatter.format(date);
}

/**
 * Splits open work for the dashboard: what needs action now (overdue, or due
 * today/tomorrow) and what is coming up after that.
 */
export function getDashboardGroups(
  assignments: readonly Assignment[],
  now: number,
) {
  const open = sortAssignments(assignments, now).filter(
    (a) => getDisplayStatus(a, now) !== "completed",
  );

  const needsAttention = open.filter(
    (a) =>
      getDisplayStatus(a, now) === "overdue" ||
      calendarDayDiff(a.dueDate, now) <= 1,
  );
  const upcoming = open.filter((a) => !needsAttention.includes(a));

  return { needsAttention, upcoming };
}
