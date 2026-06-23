import type { ReactNode } from 'react';

interface Props {
  /** Route-style path echoing the nav `~/` motif, e.g. "skills" → ~/skills */
  path: string;
  /** The display heading text. */
  title: string;
  /** Heading level — h1 for page headers, h2 for in-page sections. */
  as?: 'h1' | 'h2';
  /** Optional trailing metadata rendered beside the title (e.g. "42 technologies"). */
  meta?: ReactNode;
}

/**
 * Unified page/section header for the public site.
 *
 * Replaces the per-section tracked-uppercase eyebrow (an AI-grammar tell) with
 * the terminal-path motif already established in the nav. Lowercase, functional
 * wayfinding — a deliberate brand system, not a decorative kicker.
 */
export default function SectionHeading({ path, title, as = 'h2', meta }: Props) {
  const Heading = as;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-sm text-muted-foreground">
        <span className="text-primary/70 select-none">~/</span>
        {path}
      </span>
      <div className="flex items-end gap-x-4 gap-y-1 flex-wrap">
        <Heading className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-[1.05] text-balance">
          {title}
        </Heading>
        {meta && (
          <span className="font-mono text-muted-foreground text-sm mb-1.5">
            {meta}
          </span>
        )}
      </div>
    </div>
  );
}
