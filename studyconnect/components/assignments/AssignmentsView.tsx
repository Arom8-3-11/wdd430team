"use client";

import { useState } from "react";
import Link from "next/link";
import {
  filterAssignments,
  sortAssignments,
  summarizeAssignments,
  type StatusFilter,
} from "@/lib/assignments";
import {
  useAssignments,
  type AssignmentsSuccessState,
} from "@/lib/use-assignments";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import PageHeader from "@/components/ui/PageHeader";
import { ListIcon } from "@/components/ui/icons";
import { primaryButton, secondaryButton } from "@/components/ui/button-styles";
import AssignmentFilters from "./AssignmentFilters";
import AssignmentList from "./AssignmentList";
import { AssignmentListSkeleton } from "./AssignmentSkeletons";
import SampleDataNotice from "./SampleDataNotice";

const FILTER_LABELS: Record<Exclude<StatusFilter, "all">, string> = {
  pending: "pending",
  completed: "completed",
  overdue: "overdue",
};

export default function AssignmentsView() {
  const { state, retry } = useAssignments();
  const [filter, setFilter] = useState<StatusFilter>("all");

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-8 sm:py-12">
      <PageHeader
        title="My Assignments"
        description="Keep track of your coursework, deadlines, and progress."
        actions={
          <Link href="/dashboard" className={secondaryButton}>
            Back to dashboard
          </Link>
        }
      />

      {state.status === "loading" ? (
        <div role="status" aria-live="polite">
          <span className="sr-only">Loading assignments…</span>
          <AssignmentListSkeleton />
        </div>
      ) : null}

      {state.status === "error" ? (
        <ErrorState
          title="We couldn't load your assignments"
          message={state.message}
          onRetry={retry}
        />
      ) : null}

      {state.status === "success" ? (
        <AssignmentsContent
          state={state}
          filter={filter}
          onFilterChange={setFilter}
        />
      ) : null}
    </div>
  );
}

function AssignmentsContent({
  state,
  filter,
  onFilterChange,
}: {
  state: AssignmentsSuccessState;
  filter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}) {
  const { assignments, loadedAt: now, isSample } = state;

  if (assignments.length === 0) {
    return (
      <EmptyState
        icon={<ListIcon className="size-7" />}
        title="No assignments yet"
        description="When you add coursework, it will show up here with due dates and status so nothing slips by."
        action={
          <Link href="/dashboard" className={primaryButton}>
            Go to dashboard
          </Link>
        }
      />
    );
  }

  const summary = summarizeAssignments(assignments, now);
  const visible = sortAssignments(
    filterAssignments(assignments, filter, now),
    now,
  );

  return (
    <>
      {isSample ? <SampleDataNotice /> : null}

      <AssignmentFilters
        value={filter}
        summary={summary}
        onChange={onFilterChange}
      />

      <p aria-live="polite" className="text-sm text-slate-600">
        Showing {visible.length} of {summary.total} assignments
      </p>

      {visible.length === 0 && filter !== "all" ? (
        <EmptyState
          icon={<ListIcon className="size-7" />}
          title={`No ${FILTER_LABELS[filter]} assignments`}
          description="Nothing matches this filter right now."
          action={
            <button
              type="button"
              onClick={() => onFilterChange("all")}
              className={secondaryButton}
            >
              Show all assignments
            </button>
          }
        />
      ) : (
        <AssignmentList
          assignments={visible}
          now={now}
          label={`${filter === "all" ? "All" : FILTER_LABELS[filter]} assignments`}
        />
      )}
    </>
  );
}
