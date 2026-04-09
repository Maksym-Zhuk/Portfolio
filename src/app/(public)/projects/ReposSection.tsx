'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectCard from '@/components/Projects/ProjectCard';
import { useGetRepos } from '@/hooks/useGetRepos';
import type { CustomProject } from '@/db/schema';

interface Props {
  imageMap: Record<string, string>;
  customProjects: CustomProject[];
}

export default function ReposSection({ imageMap, customProjects }: Props) {
  const { data, isLoading, error } = useGetRepos();

  if (error) {
    return (
      <div
        role="alert"
        className="w-full flex flex-col justify-center items-center gap-3 px-4 text-center py-20"
      >
        <span className="font-mono text-primary text-4xl">!</span>
        <p className="text-lg font-semibold">Failed to load projects</p>
        <p className="text-sm text-muted-foreground font-mono">
          Could not reach the GitHub API. Check your connection or token.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Custom (non-GitHub) projects */}
      {customProjects.length > 0 && (
        <section aria-label="Custom projects" className="flex flex-col gap-6">
          <h2 className="text-xl font-bold font-mono text-muted-foreground">/ custom</h2>
          <div className="flex flex-col gap-6">
            {customProjects.map((p) => (
              <ProjectCard
                key={p.id}
                name={p.name}
                description={p.description}
                topics={p.topics ?? []}
                html_url={p.githubUrl ?? '#'}
                homepage={p.homepageUrl ?? ''}
                language={p.language ?? undefined}
                imageUrl={p.imageUrl ?? undefined}
              />
            ))}
          </div>
        </section>
      )}

      {/* GitHub repos */}
      <section aria-label="GitHub repositories">
        <h2 className="text-xl font-bold mb-6 font-mono text-muted-foreground">
          / repositories
        </h2>
        {isLoading ? (
          <div
            aria-live="polite"
            aria-busy="true"
            className="w-full flex justify-center items-center py-20"
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"
                aria-hidden="true"
              />
              <span className="font-mono text-sm text-muted-foreground">
                Fetching repos...
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {data?.map((item: any) => (
              <ProjectCard
                key={item.id}
                name={item.name}
                description={item.description}
                topics={item.topics}
                html_url={item.html_url}
                homepage={item.homepage}
                language={item.language}
                imageUrl={imageMap[item.name]}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
