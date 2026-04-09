'use client';
import { Skill } from '@/types/skills';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  data: Skill;
}

export default function SkillCard({ data }: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const start = new Date(data.firstTried);
  const end = now;

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const experienceLabel =
    years > 0
      ? `${years}y ${months}m`
      : months > 0
        ? `${months}m ${days}d`
        : `${days}d`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label={`${data.title} — ${data.category}, ${experienceLabel} experience`}
          className="group bg-card w-36 h-36 flex flex-col justify-between items-center rounded-xl py-6 px-3 border border-border hover:border-primary/50 transition-all duration-200 hover:glow-primary-sm focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Image
            src={data.logo}
            alt=""
            aria-hidden="true"
            width={44}
            height={44}
            className="object-contain group-hover:scale-105 transition-transform duration-200"
          />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-sm font-semibold text-center leading-tight">
              {data.title}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {experienceLabel}
            </span>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="border-border bg-card">
        <DialogHeader>
          <DialogTitle asChild>
            <div className="flex items-center gap-4">
              <Image
                src={data.logo}
                alt=""
                aria-hidden="true"
                width={44}
                height={44}
                className="object-contain"
              />
              <div className="flex flex-col gap-1">
                <span className="text-lg font-bold">{data.title}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded border border-primary/40 text-primary bg-primary/10 w-fit">
                  {data.category}
                </span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-3 font-mono text-sm">
          <div className="flex justify-between border-b border-border pb-3">
            <span className="text-muted-foreground">First tried</span>
            <span>{data.firstTried}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Experience</span>
            <span>
              {years > 0 && `${years}y `}
              {months > 0 && `${months}m `}
              {days}d
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
