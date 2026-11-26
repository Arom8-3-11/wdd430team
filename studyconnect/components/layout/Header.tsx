import Link from "next/link";
import MainNav from "./MainNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-emerald-800 text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md text-xl font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-2xl"
        >
          StudyConnect
        </Link>

        <MainNav />
      </div>
    </header>
  );
}
