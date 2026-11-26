"use client";

import Link from "next/link";
import {
  getDashboardGroups,
  summarizeAssignments,
  type Assignment,
} from "@/lib/assignments";
import { useAssignments } from "@/lib/use-assignments";
import AssignmentList from "@/components/assignments/AssignmentList";
import {
  AssignmentListSkeleton,
  StatsSkeleton,
} from "@/components/assignments/AssignmentSkeletons";
import SampleDataNotice from "@/components/assignments/SampleDataNotice";
import { STATUS_CONFIG } from "@/components/assignments/status-config";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import PageHeader from "@/components/ui/PageHeader";
import { ListIcon } from "@/components/ui/icons";
import { primaryButton } from "@/components/ui/button-styles";
import ProgressCard from "./ProgressCard";
import QuickLinks from "./QuickLinks";
import StatCard from "./StatCard";

const todayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export default function DashboardView() {
  const { state, retry } = useAssignments();

  const eyebrow =
    state.status === "success"
      ? todayFormatter.format(state.loadedAt)
      : "Dashboard";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-6 py-8 sm:py-12">
      <PageHeader
        eyebrow={eyebrow}
        title="Your study dashboard"
        description="See what needs your attention and how your coursework is going."
        actions={
          <Link href="/assignments" className={primaryButton}>
            View all assignments
          </Link>
        }
      />

      {state.status === "loading" ? (
        <div role="status" aria-live="polite" className="space-y-8">
          <span className="sr-only">Loading your dashboard…</span>
          <StatsSkeleton />
          <AssignmentListSkeleton count={3} />
        </div>
      ) : null}

      {state.status === "error" ? (
        <ErrorState
          title="We couldn't load your dashboard"
          message={state.message}
          onRetry={retry}
        />
      ) : null}

      {state.status === "success" ? (
        <DashboardContent
          assignments={state.assignments}
          now={state.loadedAt}
          isSample={state.isSample}
        />
      ) : null}
    </div>
  );
}

function DashboardContent({
  assignments,
  now,
  isSample,
}: {
  assignments: Assignment[];
  now: number;
  isSample: boolean;
}) {
  if (assignments.length === 0) {
    return (
      <EmptyState
        icon={<ListIcon className="size-7" />}
        title="Your dashboard is ready"
        description="Once you have assignments, you'll see deadlines, progress, and what to tackle first right here."
        action={
          <Link href="/assignments" className={primaryButton}>
            Go to assignments
          </Link>
        }
      />
    );
  }

  const summary = summarizeAssignments(assignments, now);
  const { needsAttention, upcoming } = getDashboardGroups(assignments, now);

  return (
    <>
      {isSample ? <SampleDataNotice /> : null}

      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">
          Assignment summary
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            label="Total assignments"
            value={summary.total}
            tileClassName="bg-[#e8efe0] text-emerald-800"
            icon={<ListIcon className="size-5" />}
          />
          {(["pending", "completed", "overdue"] as const).map((status) => {
            const { label, Icon, iconTile } = STATUS_CONFIG[status];

            return (
              <StatCard
                key={status}
                label={label}
                value={summary[status]}
                tileClassName={iconTile}
                icon={<Icon className="size-5" />}
              />
            );
          })}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
        <div className="min-w-0 space-y-8">
          <section aria-labelledby="attention-heading">
            <h2
              id="attention-heading"
              className="mb-4 text-xl font-semibold tracking-tight text-slate-950"
            >
              Needs attention
            </h2>
            {needsAttention.length > 0 ? (
              <AssignmentList
                assignments={needsAttention}
                now={now}
                label="Assignments that need attention"
                compact
              />
            ) : (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
                You&apos;re all caught up. Nothing is overdue or due in the next
                two days.
              </p>
            )}
          </section>

          {upcoming.length > 0 ? (
            <section aria-labelledby="upcoming-heading">
              <h2
                id="upcoming-heading"
                className="mb-4 text-xl font-semibold tracking-tight text-slate-950"
              >
                Coming up
              </h2>
              <AssignmentList
                assignments={upcoming.slice(0, 4)}
                now={now}
                label="Upcoming assignments"
                compact
              />
            </section>
          ) : null}
        </div>

        <aside aria-label="Progress and shortcuts" className="space-y-4">
          <ProgressCard summary={summary} />
          <QuickLinks />
        </aside>
      </div>
    </>
  );
}
