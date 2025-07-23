'use client';

import * as React from 'react';
import { useInView, type UseInViewOptions } from 'motion/react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/animate-ui/buttons/copy';

const loadShiki = async () => {
  const shikiModule = await import('shiki');
  return shikiModule.codeToHtml;
};

type CodeEditorProps = Omit<React.ComponentProps<'div'>, 'onCopy'> & {
  children: string;
  lang: string;
  themes?: {
    light: string;
    dark: string;
  };
  duration?: number;
  delay?: number;
  header?: boolean;
  dots?: boolean;
  icon?: React.ReactNode;
  cursor?: boolean;
  inView?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  inViewOnce?: boolean;
  copyButton?: boolean;
  writing?: boolean;
  title?: string;
  onDone?: () => void;
  onCopy?: (content: string) => void;
};

function CodeEditor({
  children: code,
  lang,
  themes = {
    light: 'github-light',
    dark: 'github-dark',
  },
  duration = 5,
  delay = 0,
  className,
  header = true,
  dots = true,
  icon,
  cursor = false,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  copyButton = false,
  writing = true,
  title,
  onDone,
  onCopy,
  ...props
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();

  const editorRef = React.useRef<HTMLDivElement>(null);
  const [visibleCode, setVisibleCode] = React.useState('');
  const [highlightedCode, setHighlightedCode] = React.useState('');
  const [isDone, setIsDone] = React.useState(false);

  const [shikiCodeToHtml, setShikiCodeToHtml] = React.useState<
    | ((
        code: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options: { lang: string; themes: any; defaultColor?: string },
      ) => Promise<string>)
    | null
  >(null);

  React.useEffect(() => {
    loadShiki()
      .then((setCodeToHtmlFunc) => {
        if (typeof setCodeToHtmlFunc === 'function') {
          setShikiCodeToHtml(() => setCodeToHtmlFunc);
        } else {
          console.error("Shiki's codeToHtml was not loaded as a function.");
        }
      })
      .catch((error) => {
        console.error('Failed to load Shiki module:', error);
      });
  }, []);

  const inViewResult = useInView(editorRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  React.useEffect(() => {
    if (!shikiCodeToHtml || !visibleCode.length || !isInView) {
      setHighlightedCode('');
      return;
    }

    const highlightCode = async () => {
      try {
        const highlighted = await shikiCodeToHtml(visibleCode, {
          lang,
          themes: {
            light: themes.light,
            dark: themes.dark,
          },
          defaultColor: resolvedTheme === 'dark' ? 'dark' : 'light',
        });
        setHighlightedCode(highlighted);
      } catch (e) {
        console.error(
          `Language "${lang}" could not be loaded or highlighted.`,
          e,
        );
        setHighlightedCode(
          `<pre><code>Error loading language: ${lang}. Check your 'lang' prop and Shiki configuration.</code></pre>`,
        );
      }
    };

    highlightCode();
  }, [lang, themes, visibleCode, resolvedTheme, shikiCodeToHtml, isInView]);

  React.useEffect(() => {
    if (!writing) {
      setVisibleCode(code);
      setIsDone(true);
      onDone?.();
      return;
    }

    if (!code.length || !isInView) {
      setVisibleCode('');
      setIsDone(false);
      return;
    }

    let intervalId: NodeJS.Timeout;
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      let currentCodeIndex = 0;
      setVisibleCode('');
      setIsDone(false);

      intervalId = setInterval(
        () => {
          if (currentCodeIndex < code.length) {
            const charToAdd = code[currentCodeIndex];
            setVisibleCode((prev) => {
              const newCode = prev + charToAdd;
              return newCode;
            });

            editorRef.current?.scrollTo({
              top: editorRef.current?.scrollHeight,
              behavior: 'smooth',
            });
            currentCodeIndex += 1;
          } else {
            clearInterval(intervalId);
            setIsDone(true);
            onDone?.();
          }
        },
        (duration * 1000) / code.length,
      );
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [code, duration, delay, isInView, writing, onDone]);

  return (
    <div
      data-slot="code-editor"
      className={cn(
        'relative bg-muted/50 w-[600px] h-[400px] border border-border overflow-hidden flex flex-col rounded-xl',
        className,
      )}
      {...props}
    >
      {header ? (
        <div className="bg-muted border-b border-border/75 dark:border-border/50 relative flex flex-row items-center justify-between gap-y-2 h-10 px-4">
          {dots && (
            <div className="flex flex-row gap-x-2">
              <div className="size-2 rounded-full bg-red-500"></div>
              <div className="size-2 rounded-full bg-yellow-500"></div>
              <div className="size-2 rounded-full bg-green-500"></div>
            </div>
          )}

          {title && (
            <div
              className={cn(
                'flex flex-row items-center gap-2',
                dots &&
                  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              )}
            >
              {icon ? (
                <div
                  className="text-muted-foreground [&_svg]:size-3.5"
                  dangerouslySetInnerHTML={
                    typeof icon === 'string' ? { __html: icon } : undefined
                  }
                >
                  {typeof icon !== 'string' ? icon : null}
                </div>
              ) : null}
              <figcaption className="flex-1 truncate text-muted-foreground text-[13px]">
                {title}
              </figcaption>
            </div>
          )}

          {copyButton ? (
            <CopyButton
              content={code}
              size="sm"
              variant="ghost"
              className="-me-2 bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
              onCopy={onCopy}
            />
          ) : null}
        </div>
      ) : (
        copyButton && (
          <CopyButton
            content={code}
            size="sm"
            variant="ghost"
            className="absolute right-2 top-2 z-[2] backdrop-blur-md bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
            onCopy={onCopy}
          />
        )
      )}
      <div
        ref={editorRef}
        className="h-[calc(100%-2.75rem)] w-full text-sm p-4 font-mono relative overflow-auto flex-1"
      >
        <div
          className={cn(
            '[&>pre]:!bg-transparent [&>code]:!bg-transparent',
            '[&>pre]:border-none [&>code]:border-none',
            '[&>pre]:p-0 [&>code]:p-0',
            '[&>pre]:m-0 [&>code]:m-0',
            '[&_code]:!text-[13px]',
            '[&>pre]:whitespace-pre-wrap',
            '[&>pre>code]:whitespace-pre-wrap',
            '[&>pre]:break-words',
            '[&>pre>code]:block',
            cursor &&
              !isDone &&
              "[&_.line:last-of-type::after]:content-['|'] [&_.line:last-of-type::after]:animate-pulse [&_.line:last-of-type::after]:inline-block [&_.line:last-of-type::after]:w-[1ch] [&_.line:last-of-type::after]:-translate-px",
          )}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}

export { CodeEditor, type CodeEditorProps };
