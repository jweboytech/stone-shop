'use client'

import gqlClient from '@/lib/graphqlClient';
import useSWR from 'swr';

interface UseGQLQueryOptions<T> {
  key: string | any[];
  query: string;
  variables?: Record<string, any>;
  enabled?: boolean;
}

export function useGQLQuery<T = any>({
  key,
  query,
  variables = {},
  enabled = true,
}: UseGQLQueryOptions<T>) {
  const shouldFetch = enabled && Boolean(key);
  const fetcher = () => gqlClient.request<T>(query, variables);
  const { data, error, isLoading, mutate } = useSWR<T>(shouldFetch ? key : null, fetcher);

  return { data, error, isLoading, mutate };
}
