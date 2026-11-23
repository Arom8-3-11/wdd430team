import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="bg-emerald-800 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md text-2xl font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          StudyConnect
        </Link>

        <nav aria-label="Main navigation">
          <NavLinks
            className="flex flex-wrap gap-x-1 text-sm font-medium"
            linkClassName="inline-flex min-h-11 items-center rounded-md px-3 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          />
        </nav>
      </div>
    </header>
  );
}
