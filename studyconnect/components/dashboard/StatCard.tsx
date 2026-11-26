import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: number;
  icon: ReactNode;
  /** Tailwind classes for the icon tile background and colour. */
  tileClassName: string;
};

export default function StatCard({
  label,
  value,
  icon,
  tileClassName,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
      <span
        className={`flex size-10 items-center justify-center rounded-xl ${tileClassName}`}
      >
        {icon}
      </span>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}
