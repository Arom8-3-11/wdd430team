import type { Metadata } from "next";
import DashboardView from "@/components/dashboard/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard | StudyConnect",
  description: "Your assignments, deadlines, and progress at a glance.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
