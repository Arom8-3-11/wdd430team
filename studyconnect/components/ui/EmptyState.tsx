import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center sm:py-16">
      {icon ? (
        <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#e8efe0] text-emerald-800">
          {icon}
        </span>
      ) : null}
      <h2 className="text-lg font-semibold tracking-tight text-slate-950">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
