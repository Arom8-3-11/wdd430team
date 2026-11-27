import type { DisplayStatus } from "@/lib/assignments";
import { STATUS_CONFIG } from "./status-config";

export default function StatusBadge({ status }: { status: DisplayStatus }) {
  const { label, Icon, badge } = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${badge}`}
    >
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}
