import Link from 'next/link';

export default function OxideSection() {
  return (
    <section
      id="oxide"
      aria-label="Oxide open source organization"
      className="w-full py-16 scroll-mt-24"
    >
      <div className="flex flex-col gap-3 mb-8">
        <span className="text-primary font-mono text-sm tracking-widest uppercase">
          Open Source
        </span>
        <h2 className="text-3xl font-bold">Organization</h2>
      </div>

      <Link
        href="https://github.com/oxide-cli"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Oxide organization on GitHub"
        className="group block"
      >
        <div className="relative border border-border rounded-xl p-6 sm:p-8 bg-card transition-all duration-300 hover:border-primary/50 hover:glow-primary-sm overflow-hidden">
          {/* Decorative corner accent */}
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-full h-full bg-primary rounded-bl-full" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Logo mark */}
            <div
              className="shrink-0 w-14 h-14 rounded-lg border border-primary/40 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors"
              aria-hidden="true"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="14"
                  cy="14"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                />
                <circle
                  cx="14"
                  cy="14"
                  r="5"
                  fill="currentColor"
                  className="text-primary"
                />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-foreground">Oxide</h3>
                <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded border border-primary/50 text-primary bg-primary/10">
                  Lead Developer
                </span>
                <span className="px-2 py-0.5 text-xs font-mono rounded border border-border text-muted-foreground">
                  v0.4.0
                </span>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base mb-5 leading-relaxed max-w-xl">
                A cross-platform project scaffolding CLI written in Rust. Fast,
                reliable tooling for bootstrapping new projects from templates
                — designed for developer workflow efficiency.
              </p>

              <div className="flex flex-wrap gap-4 mb-5">
                {[
                  { label: 'Language', value: 'Rust 87%' },
                  { label: 'Releases', value: '6' },
                  { label: 'License', value: 'MIT / Apache-2.0' },
                  { label: 'Status', value: 'Active' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {['rust', 'cli', 'scaffolding', 'cross-platform', 'tooling'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono rounded bg-secondary text-secondary-foreground"
                    >
                      #{tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Arrow */}
            <div
              className="hidden sm:flex items-center self-center text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
              aria-hidden="true"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
