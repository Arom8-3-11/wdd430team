import Link from "next/link";

type PagePlaceholderProps = {
  title: string;
  intro: string;
  sectionTitle: string;
  message: string;
};

/**
 * Shared "coming soon" layout for feature pages.
 * It intentionally renders a <div>, not <main>: the single <main> lives in
 * app/layout.tsx.
 */
export default function PagePlaceholder({
  title,
  intro,
  sectionTitle,
  message,
}: PagePlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">{title}</h1>

      <p className="mb-8 text-gray-700">{intro}</p>

      <section
        aria-labelledby="placeholder-heading"
        className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <h2
          id="placeholder-heading"
          className="mb-3 text-xl font-semibold text-gray-900"
        >
          {sectionTitle}
        </h2>

        <p className="mb-6 text-gray-700">{message}</p>

        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-lg bg-emerald-800 px-5 py-3 font-medium text-white hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          Back to Home
        </Link>
      </section>
    </div>
  );
}
