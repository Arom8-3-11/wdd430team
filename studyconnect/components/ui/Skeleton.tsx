type SkeletonProps = { className?: string };

/** Decorative placeholder block. Pair with a labelled `role="status"` wrapper. */
export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-slate-200/80 motion-reduce:animate-none ${className}`}
    />
  );
}
