import Link from "next/link";
import { BookIcon, UsersIcon } from "@/components/ui/icons";

const links = [
  {
    href: "/groups",
    title: "Study Groups",
    description: "Find classmates to study with.",
    Icon: UsersIcon,
  },
  {
    href: "/materials",
    title: "Materials",
    description: "Browse shared notes and resources.",
    Icon: BookIcon,
  },
];

export default function QuickLinks() {
  return (
    <section
      aria-labelledby="explore-heading"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 id="explore-heading" className="text-sm font-semibold text-slate-950">
        Explore StudyConnect
      </h2>
      <ul className="mt-3 space-y-1">
        {links.map(({ href, title, description, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex min-h-11 items-center gap-3 rounded-xl p-2 transition hover:bg-[#f4f4e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e8efe0] text-emerald-800">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-900">
                  {title}
                </span>
                <span className="block text-xs text-slate-600">
                  {description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
