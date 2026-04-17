import Link from "next/link";

// ─── Add your projects here ─────────────────────────────────────────
const PROJECTS = [
  { name: "Cards", route: "/cards" },
  { name: "Cards Level Wise", route: "/cards-level-wise" },
  { name: "Live Search", route: "/live-search" },
  { name: "Virtualization", route: "/virtulization" },
  { name: "Infinite Scroll", route: "/infinite-scroll-2" },
  {
    name: "Multi Select Input with Keyboard Navigation",
    route: "/multi-select-input-with-keyboard-navigation",
  },
  {
    name: "Multi Select Input with Keyboard Navigation 1",
    route: "/multi-select-input-with-keyboard-navigation-1",
  },
  {
    name:"Toast Notification",
    route:"toast-notification"
  },
  {
    name:"Data Table",
    route:"data-table"
  }
] as const;
// ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-950 font-serif">
      {/* Subtle ruled-paper lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 31px, #64748b 31px, #64748b 32px)",
        }}
      />

      {/* Red margin line */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-[72px] hidden w-[2px] bg-rose-500/10 md:block" />

      <div className="relative z-10 mx-auto w-full max-w-xl px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500">
            &#9998; practice repo
          </p>
          <h1
            className="mb-2 text-4xl font-bold tracking-tight text-amber-100/90"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ship Small Collection
          </h1>
          <p className="text-sm italic text-stone-500">
            {PROJECTS.length} experiments &middot; tap to explore
          </p>
          <div className="mx-auto mt-5 h-px w-32 bg-stone-700" />
        </header>

        {/* Notebook entries */}
        <ol className="space-y-0">
          {PROJECTS.map((project, i) => (
            <li key={project.route}>
              <Link
                href={project.route}
                className="group flex items-baseline gap-4 border-b border-dashed border-stone-700/50 px-2 py-3.5 transition-colors hover:bg-stone-800/40"
              >
                {/* Index number */}
                <span className="w-7 shrink-0 text-right font-mono text-xs tabular-nums text-stone-600">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Project name */}
                <span className="flex-1 text-base text-stone-300 transition-colors group-hover:text-amber-100">
                  {project.name}
                </span>

                {/* Dots leader + arrow */}
                <span className="hidden shrink-0 items-center gap-2 text-stone-600 group-hover:text-stone-400 sm:flex">
                  <span className="text-xs tracking-[0.25em]">
                    &middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;
                  </span>
                  <span className="translate-x-0 text-sm transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-stone-600">
          <span className="italic">Work in progress...</span>
        </footer>
      </div>
    </div>
  );
}