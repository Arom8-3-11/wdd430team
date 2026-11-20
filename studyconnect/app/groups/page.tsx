import Link from "next/link";

export default function GroupsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Study Groups</h1>

      <p className="mb-8 text-gray-600">
        Connect with classmates and learn together.
      </p>

      <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">
          Find Your Study Group
        </h2>

        <p className="mb-6 text-gray-600">
          Study groups will appear here once group creation and membership
          features are implemented.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-emerald-800 px-5 py-3 font-medium text-white hover:bg-emerald-900"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
