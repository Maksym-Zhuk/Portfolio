'use client';
import { GetRepos } from '@/services/repo.service';
import { useQuery } from '@tanstack/react-query';

export const useGetRepos = () => {
  return useQuery({
    queryKey: ['Repos'],
    queryFn: GetRepos,
  });
};
