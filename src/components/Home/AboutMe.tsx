'use client';

import { CodeEditor } from '@/components/animate-ui/components/code-editor';
import { CopyButton } from '@/components/animate-ui/buttons/copy';
import Image from 'next/image';
import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type Lang = 'rust' | 'tsx' | 'nest';

const TABS: { lang: Lang; filename: string; icon: string; alt: string }[] = [
  {
    lang: 'nest',
    filename: 'developer.controller.ts',
    icon: '/Nest.js.svg',
    alt: 'NestJS',
  },
  { lang: 'rust', filename: 'about_me.rs', icon: '/Rust.svg', alt: 'Rust' },
  {
    lang: 'tsx',
    filename: 'AboutMe.tsx',
    icon: '/TypeScript.svg',
    alt: 'TypeScript',
  },
];

const SHIKI_LANG: Record<Lang, string> = {
  rust: 'rust',
  tsx: 'tsx',
  nest: 'typescript',
};

const DURATION: Record<Lang, number> = {
  rust: 20,
  tsx: 16,
  nest: 18,
};

function renderInline(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*|==[^=]+==)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('==') && part.endsWith('==')) {
        return (
          <span key={i} className="text-primary font-semibold">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
}

function renderHrSummary(text: string) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h3 key={i} className="text-lg sm:text-xl font-semibold text-foreground">
            {renderInline(line.slice(3))}
          </h3>
        );
      }
      if (line.startsWith('# ')) {
        return (
          <h2 key={i} className="text-2xl sm:text-3xl font-bold text-foreground">
            {renderInline(line.slice(2))}
          </h2>
        );
      }
      return (
        <p key={i} className="text-base sm:text-lg leading-relaxed text-muted-foreground">
          {renderInline(line)}
        </p>
      );
    });
}

interface Props {
  rustCode: string;
  tsCode: string;
  nestCode: string;
  hrSummary: string;
}

export default function AboutMe({ rustCode, tsCode, nestCode, hrSummary }: Props) {
  const [lang, setLang] = useState<Lang>('nest');
  const [audience, setAudience] = useState<'dev' | 'hr'>('hr');
  const prefersReducedMotion = useReducedMotion();
  const CODE: Record<Lang, string> = {
    rust: rustCode,
    tsx: tsCode,
    nest: nestCode,
  };
  const code = CODE[lang];

  const tabHeader = (
    <div className="bg-muted border-b border-border/75 flex items-stretch h-10 shrink-0">
      <div className="flex items-center gap-1.5 px-3 shrink-0">
        <div className="size-2 rounded-full bg-red-500" aria-hidden="true" />
        <div className="size-2 rounded-full bg-yellow-500" aria-hidden="true" />
        <div className="size-2 rounded-full bg-green-500" aria-hidden="true" />
      </div>

      <div
        className="flex flex-1 overflow-x-auto scrollbar-none"
        role="tablist"
        aria-label="Code language"
      >
        {TABS.map((tab) => {
          const active = lang === tab.lang;
          return (
            <button
              key={tab.lang}
              role="tab"
              aria-selected={active}
              onClick={() => setLang(tab.lang)}
              className={cn(
                'flex items-center gap-1.5 px-3 text-[12px] font-mono border-r border-border/40 shrink-0 transition-colors duration-150 relative focus-visible:outline-2 focus-visible:outline-primary',
                active
                  ? 'bg-background/[0.08] text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/[0.04]',
              )}
            >
              {active && (
                <span
                  className="absolute top-0 left-0 right-0 h-[2px] bg-primary rounded-b-sm"
                  aria-hidden="true"
                />
              )}
              <Image
                src={tab.icon}
                alt=""
                aria-hidden="true"
                width={12}
                height={12}
                className="object-contain shrink-0"
              />
              {tab.filename}
            </button>
          );
        })}
      </div>

      <div className="flex items-center pr-1 shrink-0">
        <CopyButton
          content={code}
          size="sm"
          variant="ghost"
          className="bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
        />
      </div>
    </div>
  );

  const widthClass = 'xl:min-w-[600px] lg:w-[490px] md:w-4/5 w-full';
  const editorSize = cn(widthClass, 'lg:h-[580px] sm:h-[500px] min-[400px]:h-[600px] h-[650px]');

  return (
    <div className="lg:w-2/4 flex flex-col justify-center gap-4 lg:items-start items-center">
      <div
        role="tablist"
        aria-label="Viewing as"
        className="inline-flex items-center rounded-lg border border-border bg-muted p-1 font-mono text-xs"
      >
        <button
          role="tab"
          aria-selected={audience === 'hr'}
          onClick={() => setAudience('hr')}
          className={cn(
            'px-3 py-1.5 rounded-md transition-colors duration-150',
            audience === 'hr'
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          For HR
        </button>
        <button
          role="tab"
          aria-selected={audience === 'dev'}
          onClick={() => setAudience('dev')}
          className={cn(
            'px-3 py-1.5 rounded-md transition-colors duration-150',
            audience === 'dev'
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          For Devs
        </button>
      </div>

      {audience === 'dev' ? (
        <CodeEditor
          key={lang}
          customHeader={tabHeader}
          cursor={!prefersReducedMotion}
          writing={!prefersReducedMotion}
          className={editorSize}
          lang={SHIKI_LANG[lang]}
          duration={DURATION[lang]}
          delay={0.3}
        >
          {code}
        </CodeEditor>
      ) : (
        <div className={cn(widthClass, 'flex flex-col gap-3')}>{renderHrSummary(hrSummary)}</div>
      )}
    </div>
  );
}
