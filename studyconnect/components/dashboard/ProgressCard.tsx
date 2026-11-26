import type { AssignmentSummary } from "@/lib/assignments";

export default function ProgressCard({
  summary,
}: {
  summary: AssignmentSummary;
}) {
  return (
    <section
      aria-labelledby="progress-heading"
      className="rounded-2xl bg-emerald-800 p-5 text-white sm:p-6"
    >
      <h2
        id="progress-heading"
        className="text-sm font-semibold text-emerald-100"
      >
        Overall progress
      </h2>
      <p className="mt-2 text-4xl font-semibold tracking-tight">
        {summary.completionRate}%
      </p>
      <div
        role="progressbar"
        aria-label="Assignments completed"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={summary.completionRate}
        className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/20"
      >
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${summary.completionRate}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-emerald-100">
        {summary.completed} of {summary.total} assignments completed
      </p>
    </section>
  );
}
