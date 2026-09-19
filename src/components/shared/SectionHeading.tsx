import type { ReactNode } from 'react';

interface Props {
  path: string;
  title: string;
  as?: 'h1' | 'h2';
  meta?: ReactNode;
}

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
