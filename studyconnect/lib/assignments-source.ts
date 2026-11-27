import type { Assignment } from "@/lib/assignments";
import { createSampleAssignments } from "@/lib/sample-assignments";

/**
 * The single place the UI gets assignments from.
 *
 * `/api/assignments` is still a stub that returns an empty list, so the UI
 * shows sample data by default (with a visible notice). Set
 * `NEXT_PUBLIC_USE_SAMPLE_DATA=false` to read from the real endpoint.
 */
export const USE_SAMPLE_DATA =
  process.env.NEXT_PUBLIC_USE_SAMPLE_DATA !== "false";

export type LoadedAssignments = {
  assignments: Assignment[];
  /** Timestamp (ms) taken when the data was loaded; used to derive status. */
  loadedAt: number;
  isSample: boolean;
};

export class AssignmentsLoadError extends Error {
  constructor(message = "We couldn't load your assignments.") {
    super(message);
    this.name = "AssignmentsLoadError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toAssignment(value: unknown, index: number): Assignment | null {
  if (!isRecord(value)) return null;

  const { id, title, description, dueDate, status, course } = value;

  if (typeof title !== "string" || typeof dueDate !== "string") return null;
  if (Number.isNaN(Date.parse(dueDate))) return null;
  if (status !== "todo" && status !== "in-progress" && status !== "done") {
    return null;
  }

  return {
    id:
      typeof id === "string" || typeof id === "number"
        ? String(id)
        : `assignment-${index}`,
    title,
    description: typeof description === "string" ? description : "",
    dueDate,
    status,
    course: typeof course === "string" ? course : undefined,
  };
}

/**
 * Reads the `{ data: [...] }` envelope used by `lib/api-response.ts`.
 * Throws when the envelope is wrong; skips individual malformed entries.
 */
export function parseAssignmentsResponse(body: unknown): Assignment[] {
  if (!isRecord(body) || !Array.isArray(body.data)) {
    throw new AssignmentsLoadError("The server sent an unexpected response.");
  }

  return body.data
    .map((item, index) => toAssignment(item, index))
    .filter((item): item is Assignment => item !== null);
}

export async function loadAssignments(
  signal?: AbortSignal,
): Promise<LoadedAssignments> {
  const loadedAt = Date.now();

  if (USE_SAMPLE_DATA) {
    return {
      assignments: createSampleAssignments(loadedAt),
      loadedAt,
      isSample: true,
    };
  }

  const response = await fetch("/api/assignments", {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new AssignmentsLoadError(
      "The server couldn't return your assignments. Try again in a moment.",
    );
  }

  const body: unknown = await response.json();

  return {
    assignments: parseAssignmentsResponse(body),
    loadedAt,
    isSample: false,
  };
}
