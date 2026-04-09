'use client';

import { Skill } from '@/types/skills';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

function useExperience(firstTried: string) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(firstTried);
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const long =
    (years > 0 ? `${years}y ` : '') +
    (months > 0 ? `${months}m ` : '') +
    `${days}d`;
  const short =
    years > 0
      ? `${years}y ${months}m`
      : months > 0
        ? `${months}m ${days}d`
        : `${days}d`;

  return { long: long.trim(), short };
}

interface Props {
  data: Skill;
  /** Compact chip variant used in the timeline view */
  compact?: boolean;
}

export default function SkillPageCard({ data, compact = false }: Props) {
  const [open, setOpen] = useState(false);
  const experience = useExperience(data.firstTried);

  return (
    <>
      {/* ── Trigger ─────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        aria-label={`${data.title} — click for details`}
        className={cn(
          'group flex items-center bg-card border border-border rounded-xl transition-all duration-200 cursor-pointer',
          'hover:border-primary/40 hover:glow-primary-sm focus-visible:outline-2 focus-visible:outline-primary',
          compact
            ? 'gap-2 pl-2.5 pr-3 py-2'
            : 'gap-3 pl-3 pr-4 py-3 min-w-[160px]',
        )}
      >
        <Image
          src={data.logo}
          alt=""
          aria-hidden="true"
          width={compact ? 24 : 36}
          height={compact ? 24 : 36}
          className="object-contain shrink-0 group-hover:scale-105 transition-transform duration-200"
        />
        <div className="flex flex-col gap-0.5 min-w-0 text-left">
          <span
            className={cn(
              'font-semibold leading-tight truncate',
              compact ? 'text-xs' : 'text-sm',
            )}
          >
            {data.title}
          </span>
          {!compact && (
            <span className="text-xs font-mono text-muted-foreground">
              {experience.short}
            </span>
          )}
        </div>
      </button>

      {/* ── Detail dialog ────────────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-border bg-card max-w-md">
          <DialogHeader>
            <DialogTitle asChild>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl border border-border bg-secondary flex items-center justify-center shrink-0">
                  <Image
                    src={data.logo}
                    alt=""
                    aria-hidden="true"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-lg font-bold leading-tight">
                    {data.title}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded border border-primary/40 text-primary bg-primary/10 w-fit">
                    {data.category}
                  </span>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 font-mono text-sm">
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-secondary border border-border">
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                First tried
              </span>
              <span className="font-semibold">{data.firstTried}</span>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-secondary border border-border">
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                Experience
              </span>
              <span className="font-semibold text-primary">
                {experience.long}
              </span>
            </div>
          </div>

          {/* Docs link */}
          <Link
            href={data.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Official ${data.title} documentation`}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:border-primary/50 hover:glow-primary-sm transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-primary"
          >
            <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">
              Official documentation
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150"
            >
              <path
                d="M3 8h10M8 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
}
