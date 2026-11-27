import {
  formatDueDate,
  getDisplayStatus,
  getDueLabel,
  type Assignment,
} from "@/lib/assignments";
import { CalendarIcon } from "@/components/ui/icons";
import StatusBadge from "./StatusBadge";
import { STATUS_CONFIG } from "./status-config";

type AssignmentCardProps = {
  assignment: Assignment;
  /** Timestamp (ms) used to work out overdue / due-soon state. */
  now: number;
};

export default function AssignmentCard({
  assignment,
  now,
}: AssignmentCardProps) {
  const status = getDisplayStatus(assignment, now);
  const config = STATUS_CONFIG[status];
  const titleId = `assignment-${assignment.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 pl-6 shadow-sm transition hover:shadow-md sm:p-6 sm:pl-7"
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1.5 ${config.accent}`}
      />

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        {assignment.course ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
            {assignment.course}
          </p>
        ) : (
          <span />
        )}
        <StatusBadge status={status} />
      </div>

      <h3
        id={titleId}
        className={`mt-3 text-lg font-semibold leading-snug tracking-tight ${
          status === "completed" ? "text-slate-500" : "text-slate-950"
        }`}
      >
        {assignment.title}
      </h3>

      {assignment.description ? (
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {assignment.description}
        </p>
      ) : null}

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-100 pt-4 text-sm">
          <p className="inline-flex items-center gap-2 text-slate-700">
            <CalendarIcon className="size-4 shrink-0 text-slate-400" />
            <time dateTime={assignment.dueDate}>
              {formatDueDate(assignment.dueDate)}
            </time>
          </p>
          <p className={`font-semibold ${config.dueText}`}>
            {getDueLabel(assignment, now)}
            {assignment.status === "in-progress" && status !== "completed" ? (
              <span className="font-normal text-slate-500"> · In progress</span>
            ) : null}
          </p>
        </div>
      </div>
    </article>
  );
}
