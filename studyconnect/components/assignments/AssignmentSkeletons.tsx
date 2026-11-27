import Skeleton from "@/components/ui/Skeleton";

export function AssignmentCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-5 w-3/4" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-2/3" />
      <Skeleton className="mt-6 h-4 w-1/2" />
    </div>
  );
}

export function AssignmentListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <AssignmentCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
        >
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="mt-4 h-8 w-12" />
          <Skeleton className="mt-2 h-3 w-20" />
        </div>
      ))}
    </div>
  );
}
