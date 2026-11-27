import type { Assignment } from "@/lib/assignments";
import AssignmentCard from "./AssignmentCard";

type AssignmentListProps = {
  assignments: readonly Assignment[];
  now: number;
  label: string;
  /** Fewer columns, for use beside a sidebar. */
  compact?: boolean;
};

export default function AssignmentList({
  assignments,
  now,
  label,
  compact = false,
}: AssignmentListProps) {
  return (
    <ul
      aria-label={label}
      className={`grid gap-4 sm:grid-cols-2 ${compact ? "" : "lg:grid-cols-3"}`}
    >
      {assignments.map((assignment) => (
        <li key={assignment.id}>
          <AssignmentCard assignment={assignment} now={now} />
        </li>
      ))}
    </ul>
  );
}
