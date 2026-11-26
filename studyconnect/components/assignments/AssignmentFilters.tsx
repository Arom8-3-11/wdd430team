"use client";

import type { AssignmentSummary, StatusFilter } from "@/lib/assignments";

type AssignmentFiltersProps = {
  value: StatusFilter;
  summary: AssignmentSummary;
  onChange: (filter: StatusFilter) => void;
};

export default function AssignmentFilters({
  value,
  summary,
  onChange,
}: AssignmentFiltersProps) {
  const options: { filter: StatusFilter; label: string; count: number }[] = [
    { filter: "all", label: "All", count: summary.total },
    { filter: "pending", label: "Pending", count: summary.pending },
    { filter: "overdue", label: "Overdue", count: summary.overdue },
    { filter: "completed", label: "Completed", count: summary.completed },
  ];

  return (
    <div
      role="group"
      aria-label="Filter assignments by status"
      className="-mx-6 flex gap-2 overflow-x-auto px-6 py-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {options.map(({ filter, label, count }) => {
        const isActive = value === filter;

        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(filter)}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
              isActive
                ? "bg-emerald-800 text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {label}
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                isActive ? "bg-white/20" : "bg-slate-100 text-slate-600"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
