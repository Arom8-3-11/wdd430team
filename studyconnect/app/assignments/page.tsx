import type { Metadata } from "next";
import AssignmentsView from "@/components/assignments/AssignmentsView";

export const metadata: Metadata = {
  title: "My Assignments | StudyConnect",
  description: "Track coursework, due dates, and status in one place.",
};

export default function AssignmentsPage() {
  return <AssignmentsView />;
}
