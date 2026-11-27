import type { Assignment } from "@/lib/assignments";

/**
 * Demo data used while the assignments API is still a stub
 * (see `lib/assignments-source.ts`). Due dates are relative to `now` so the
 * demo always shows pending, completed and overdue work.
 */
export function createSampleAssignments(now: number): Assignment[] {
  const at = (daysFromToday: number, hour: number, minute = 0) => {
    const date = new Date(now);
    date.setDate(date.getDate() + daysFromToday);
    date.setHours(hour, minute, 0, 0);
    return date.toISOString();
  };

  return [
    {
      id: "sample-1",
      course: "BIO 221",
      title: "Lab report: Cell respiration",
      description:
        "Write up the results and analysis from last week's lab, including graphs and a short discussion.",
      dueDate: at(-3, 17),
      status: "todo",
    },
    {
      id: "sample-2",
      course: "ENG 110",
      title: "Reading response: Chapter 4",
      description:
        "One-page response to the assigned reading with at least two cited passages.",
      dueDate: at(-1, 9),
      status: "in-progress",
    },
    {
      id: "sample-3",
      course: "MATH 215",
      title: "Problem set 04",
      description:
        "Complete problems 1–12 on integration techniques and show all steps.",
      dueDate: at(0, 23, 59),
      status: "in-progress",
    },
    {
      id: "sample-4",
      course: "CS 142",
      title: "Project proposal",
      description:
        "Submit a one-page proposal describing your project idea, scope, and timeline.",
      dueDate: at(2, 12),
      status: "todo",
    },
    {
      id: "sample-5",
      course: "CHEM 101",
      title: "Study group session prep",
      description:
        "Review chapters 5–6 and bring three questions for the group session.",
      dueDate: at(3, 18),
      status: "todo",
    },
    {
      id: "sample-6",
      course: "MATH 215",
      title: "Midterm review quiz",
      description:
        "Online practice quiz covering limits and derivatives. Untimed, two attempts.",
      dueDate: at(6, 20),
      status: "todo",
    },
    {
      id: "sample-7",
      course: "BIO 221",
      title: "Lecture notes review",
      description:
        "Summarize the week's lecture notes into a one-page study sheet.",
      dueDate: at(-5, 10),
      status: "done",
    },
    {
      id: "sample-8",
      course: "ENG 110",
      title: "Peer review: Essay 1",
      description:
        "Give written feedback on a classmate's essay draft using the rubric.",
      dueDate: at(-2, 14),
      status: "done",
    },
    {
      id: "sample-9",
      course: "CS 142",
      title: "Set up development environment",
      description:
        "Install the course toolchain and run the starter project successfully.",
      dueDate: at(-7, 12),
      status: "done",
    },
  ];
}
