import type { ComponentType } from "react";
import type { DisplayStatus } from "@/lib/assignments";
import { AlertIcon, CheckCircleIcon, ClockIcon } from "@/components/ui/icons";

type StatusConfig = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  /** Pill background + text colour. */
  badge: string;
  /** Left accent bar on cards. */
  accent: string;
  /** Text colour for the "Due tomorrow" style label. */
  dueText: string;
  /** Icon tile colours for stat cards. */
  iconTile: string;
};

/** One source of truth for how each status looks. Icon + label, not colour alone. */
export const STATUS_CONFIG: Record<DisplayStatus, StatusConfig> = {
  pending: {
    label: "Pending",
    Icon: ClockIcon,
    badge: "bg-amber-100 text-amber-900",
    accent: "bg-amber-500",
    dueText: "text-amber-800",
    iconTile: "bg-amber-100 text-amber-800",
  },
  completed: {
    label: "Completed",
    Icon: CheckCircleIcon,
    badge: "bg-emerald-100 text-emerald-900",
    accent: "bg-emerald-600",
    dueText: "text-emerald-800",
    iconTile: "bg-emerald-100 text-emerald-800",
  },
  overdue: {
    label: "Overdue",
    Icon: AlertIcon,
    badge: "bg-red-100 text-red-900",
    accent: "bg-red-600",
    dueText: "text-red-700",
    iconTile: "bg-red-100 text-red-700",
  },
};
