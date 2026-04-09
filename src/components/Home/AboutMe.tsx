'use client';

import { CodeEditor } from '@/components/animate-ui/components/code-editor';
import { CopyButton } from '@/components/animate-ui/buttons/copy';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Lang = 'rust' | 'tsx' | 'nest';

const TABS: { lang: Lang; filename: string; icon: string; alt: string }[] = [
  { lang: 'rust', filename: 'about_me.rs', icon: '/Rust.svg', alt: 'Rust' },
  {
    lang: 'nest',
    filename: 'developer.controller.ts',
    icon: '/Nest.js.svg',
    alt: 'NestJS',
  },
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

interface Props {
  rustCode: string;
  tsCode: string;
  nestCode: string;
}

export default function AboutMe({ rustCode, tsCode, nestCode }: Props) {
  const [lang, setLang] = useState<Lang>('rust');
  const CODE: Record<Lang, string> = {
    rust: rustCode,
    tsx: tsCode,
    nest: nestCode,
  };
  const code = CODE[lang];

  const tabHeader = (
    <div className="bg-muted border-b border-border/75 flex items-stretch h-10 shrink-0">
      {/* macOS window dots */}
      <div className="flex items-center gap-1.5 px-3 shrink-0">
        <div className="size-2 rounded-full bg-red-500" aria-hidden="true" />
        <div className="size-2 rounded-full bg-yellow-500" aria-hidden="true" />
        <div className="size-2 rounded-full bg-green-500" aria-hidden="true" />
      </div>

      {/* File tabs */}
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
              {/* active tab indicator — orange top line */}
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

      {/* Copy button */}
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

  return (
    <div className="lg:w-2/4 flex lg:justify-start justify-center items-center">
      <CodeEditor
        key={lang}
        customHeader={tabHeader}
        cursor
        className="xl:min-w-[600px] lg:w-[490px] md:w-4/5 w-full lg:h-[580px] sm:h-[500px] min-[400px]:h-[600px] h-[650px]"
        lang={SHIKI_LANG[lang]}
        duration={DURATION[lang]}
        delay={0.3}
      >
        {code}
      </CodeEditor>
    </div>
  );
}
