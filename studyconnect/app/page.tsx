const features = [
  {
    number: "01",
    title: "Keep coursework in view",
    description:
      "Bring assignments, due dates, and progress into one calmer place.",
    label: "Assignment planning",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="size-6"
      >
        <path
          d="M7.5 3.75h7.25l4 4v12.5H5.25V3.75H7.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 3.75v4h4m-9 4.5h5m-5 4h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Learn from shared notes",
    description:
      "Discover useful study materials shared by students who know the course.",
    label: "Study materials",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="size-6"
      >
        <path
          d="M4.75 5.75c2.6-.9 5-.55 7.25 1v13c-2.25-1.55-4.65-1.9-7.25-1v-13Zm14.5 0c-2.6-.9-5-.55-7.25 1v13c2.25-1.55 4.65-1.9 7.25-1v-13Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Find your study people",
    description:
      "Create a group around a class, meet new classmates, and make progress together.",
    label: "Study groups",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="size-6"
      >
        <path
          d="M15.75 19.25v-1.5a3.25 3.25 0 0 0-3.25-3.25h-5a3.25 3.25 0 0 0-3.25 3.25v1.5m14.5 0v-1.5a3.25 3.25 0 0 0-2.5-3.16m-2.25-11a3.25 3.25 0 0 1 0 6.32M10 8a3.25 3.25 0 1 1-6.5 0A3.25 3.25 0 0 1 10 8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const studyPlan = [
  { day: "MON", title: "Review lecture notes", course: "BIO 221", done: true },
  { day: "WED", title: "Problem set 04", course: "MATH 215", done: false },
  { day: "FRI", title: "Study group session", course: "CHEM 101", done: false },
];

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
        <a
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-950"
          href="#home"
          aria-label="StudyConnect home"
        >
          <span className="flex size-10 items-center justify-center rounded-2xl bg-emerald-700 text-white">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-5"
            >
              <path
                d="M4 8.25 12 4l8 4.25-8 4.25L4 8.25Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M7 10v5.25c2.9 2.45 7.1 2.45 10 0V10m3-1.75v6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>StudyConnect</span>
        </a>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-9 text-sm font-medium text-slate-600 sm:flex"
        >
          <a className="transition hover:text-emerald-800" href="#features">
            What you can do
          </a>
          <a className="transition hover:text-emerald-800" href="#approach">
            Our approach
          </a>
        </nav>
        <a
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          href="#features"
        >
          Explore the project
        </a>
      </header>

      <main id="home">
        <section className="mx-auto grid w-full max-w-7xl gap-14 px-6 pb-20 pt-10 sm:px-10 sm:pb-28 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-12 lg:pb-32 lg:pt-20">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
              <span className="size-2 rounded-full bg-emerald-600" />A better
              way to study together
            </p>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
              Make room for
              <span className="block font-serif font-medium italic text-emerald-800">
                better learning.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              StudyConnect brings assignment planning, useful course materials,
              and study groups into one welcoming space for students.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex items-center gap-3 rounded-full bg-emerald-800 px-6 py-4 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                href="#features"
              >
                See what we&apos;re building
                <span aria-hidden="true">→</span>
              </a>
              <span className="text-sm text-slate-500">
                Made for college learners
              </span>
            </div>
            <div className="mt-12 flex items-center gap-4 border-t border-slate-900/10 pt-6">
              <div className="flex -space-x-2" aria-hidden="true">
                <span className="flex size-9 items-center justify-center rounded-full border-2 border-[#f4f4e9] bg-[#edc6a9] text-xs font-semibold text-slate-800">
                  A
                </span>
                <span className="flex size-9 items-center justify-center rounded-full border-2 border-[#f4f4e9] bg-[#b9d1c5] text-xs font-semibold text-slate-800">
                  G
                </span>
                <span className="flex size-9 items-center justify-center rounded-full border-2 border-[#f4f4e9] bg-[#e8d18c] text-xs font-semibold text-slate-800">
                  C
                </span>
              </div>
              <p className="text-sm text-slate-600">
                A team project built around
                <span className="font-semibold text-slate-900">
                  {" "}
                  learning together
                </span>
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div
              aria-hidden="true"
              className="absolute -left-7 top-16 size-28 rounded-full bg-[#dbe8bb] blur-2xl sm:-left-10"
            />
            <div
              aria-hidden="true"
              className="absolute -right-5 bottom-8 size-36 rounded-full bg-[#edcfaa] blur-3xl"
            />
            <div className="relative rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_30px_90px_-40px_rgba(27,54,38,0.35)] backdrop-blur sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-800">
                    Your week, at a glance
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                    A little more in sync
                  </h2>
                </div>
                <span className="rounded-full bg-[#edf2e2] px-3 py-1.5 text-xs font-medium text-emerald-900">
                  Week 04
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {studyPlan.map((item) => (
                  <div
                    className="flex items-center gap-4 rounded-2xl bg-[#f7f8f3] p-4"
                    key={item.title}
                  >
                    <span className="w-10 shrink-0 text-[10px] font-bold tracking-[0.12em] text-slate-400">
                      {item.day}
                    </span>
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                        item.done
                          ? "border-emerald-700 bg-emerald-700 text-white"
                          : "border-slate-300 text-transparent"
                      }`}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="size-3"
                      >
                        <path
                          d="m3.5 8 3 3 6-6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-sm font-semibold ${
                          item.done
                            ? "text-slate-400 line-through"
                            : "text-slate-800"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        {item.course}
                      </span>
                    </span>
                    <span
                      className={`size-2 rounded-full ${
                        item.done ? "bg-slate-300" : "bg-amber-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-emerald-800 p-4 text-white">
                  <p className="text-xs text-emerald-100">Shared resources</p>
                  <p className="mt-2 text-2xl font-semibold">Find your notes</p>
                  <span className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium">
                    Learn from each other
                  </span>
                </div>
                <div className="rounded-2xl bg-[#f0eadb] p-4 text-slate-900">
                  <p className="text-xs text-slate-600">Study groups</p>
                  <p className="mt-2 text-2xl font-semibold">
                    Find your people
                  </p>
                  <span className="mt-4 inline-flex rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium">
                    Better, together
                  </span>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-slate-400">
                A preview of the StudyConnect experience
              </p>
            </div>
            <div className="absolute -right-2 -top-5 rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-lg sm:-right-5">
              <p className="text-xs text-slate-500">One space</p>
              <p className="mt-1 text-sm font-semibold text-emerald-800">
                More connected learning
              </p>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
                  The idea behind StudyConnect
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Everything you need to move forward, together.
                </h2>
              </div>
              <p className="max-w-md text-base leading-7 text-slate-600">
                Less time switching between tools. More time understanding the
                material, staying on track, and helping each other succeed.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  className="group rounded-3xl border border-slate-200/80 bg-[#fbfcf8] p-7 transition hover:-translate-y-1 hover:border-emerald-800/25 hover:shadow-[0_20px_50px_-35px_rgba(27,54,38,0.4)] sm:p-8"
                  key={feature.number}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-[#e8efe0] text-emerald-800">
                      {feature.icon}
                    </span>
                    <span className="text-xs font-semibold tracking-[0.14em] text-slate-400">
                      {feature.number}
                    </span>
                  </div>
                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
                    {feature.label}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="approach"
          className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-12"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Built around students
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Good study habits grow stronger in good company.
            </h2>
          </div>
          <div className="rounded-3xl bg-[#eaf0e4] p-7 sm:p-10">
            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              StudyConnect is our student project exploring a more organized,
              collaborative way to learn. We&apos;re starting with the
              essentials: managing coursework, sharing helpful resources, and
              finding classmates to study with.
            </p>
            <a
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 underline decoration-emerald-900/30 underline-offset-4 transition hover:decoration-emerald-900"
              href="#home"
            >
              Back to the top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900/10 bg-white px-6 py-7 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-semibold text-slate-900">StudyConnect</span> —
            learning is better together.
          </p>
          <p>A student project for WDD 430</p>
        </div>
      </footer>
    </>
  );
}
