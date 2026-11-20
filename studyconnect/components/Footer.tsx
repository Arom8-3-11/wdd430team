import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center text-sm text-gray-600 md:flex-row md:text-left">
        <p>© 2026 StudyConnect. All rights reserved.</p>

        <nav aria-label="Footer navigation">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/assignments" className="hover:underline">
              Assignments
            </Link>
            <Link href="/groups" className="hover:underline">
              Study Groups
            </Link>
            <Link href="/materials" className="hover:underline">
              Materials
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
