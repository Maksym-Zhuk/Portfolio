/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ProjectCard from '@/components/Projects/ProjectCard';
import { useGetRepos } from '@/hooks/useGetRepos';

export default function Projects() {
  const { data, isLoading, error } = useGetRepos();

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>isLoading</div>;
  }

  console.log(data);

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center gap-10 py-10 px-3 sm:px-10 xl:px-20">
      {data.map((item: any) => (
        <ProjectCard
          key={item.id}
          name={item.name}
          description={item.description}
          topics={item.topics}
          html_url={item.html_url}
          homepage={item.homepage}
        />
      ))}
    </div>
  );
}
