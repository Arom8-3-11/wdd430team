import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-emerald-800 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-2xl font-bold">
          StudyConnect
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-5 text-sm font-medium">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/assignments" className="hover:underline">
                Assignments
              </Link>
            </li>
            <li>
              <Link href="/groups" className="hover:underline">
                Study Groups
              </Link>
            </li>
            <li>
              <Link href="/materials" className="hover:underline">
                Materials
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
