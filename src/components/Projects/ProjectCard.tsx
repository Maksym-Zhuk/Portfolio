import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '../ui/aspect-ratio';

interface Props {
  name: string;
  description: string;
  topics: string[];
  html_url: string;
  homepage: string;
  language?: string;
  imageUrl?: string;
}

export default function ProjectCard({
  name,
  description,
  topics,
  html_url,
  homepage,
  language,
  imageUrl,
}: Props) {
  return (
    <article
      aria-label={`Project: ${name}`}
      className="w-full flex flex-col lg:flex-row items-start gap-8 border border-border rounded-xl p-6 bg-card hover:border-primary/40 transition-all duration-200 group"
    >
      {/* Image — desktop */}
      {imageUrl ? (
        <div className="hidden lg:block shrink-0 w-64 xl:w-80 overflow-hidden rounded-lg border border-border">
          <Image
            src={imageUrl}
            alt={`${name} project screenshot`}
            width={320}
            height={200}
            className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="hidden lg:flex shrink-0 w-64 xl:w-80 h-48 overflow-hidden rounded-lg border border-border bg-secondary items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground">{name}</span>
        </div>
      )}

      {/* Image — mobile */}
      {imageUrl ? (
        <div className="w-full lg:hidden overflow-hidden rounded-lg border border-border">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={imageUrl}
              alt={`${name} project screenshot`}
              fill
              className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </AspectRatio>
        </div>
      ) : (
        <div className="w-full lg:hidden overflow-hidden rounded-lg border border-border bg-secondary">
          <AspectRatio ratio={16 / 9}>
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground">{name}</span>
            </div>
          </AspectRatio>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-start gap-4 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold">{name}</h2>
          {language && (
            <span className="px-2 py-0.5 text-xs font-mono rounded border border-primary/40 text-primary bg-primary/10">
              {language}
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>

        {topics.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Project topics">
            {topics.map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs font-mono rounded bg-secondary text-secondary-foreground"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-2">
          <Link
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${name} source on GitHub`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-mono border border-border rounded-lg text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all duration-150 focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Image
              src={'/GitHub.svg'}
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
            />
            Source
          </Link>

          {homepage && (
            <Link
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${name} live demo`}
              className="flex items-center gap-2 px-4 py-2 text-sm font-mono border border-primary/40 rounded-lg text-primary bg-primary/10 hover:bg-primary/20 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-primary"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7h10M7 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Live
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
