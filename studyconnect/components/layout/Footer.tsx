import Link from "next/link";
import { NAV_ITEMS } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center text-sm text-gray-700 md:flex-row md:text-left">
        <p>© 2026 StudyConnect. All rights reserved.</p>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-md px-3 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
