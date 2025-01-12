import useSWR from 'swr';
import fetcher from '../_libs/fetcher';

export default function useUserQueries() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/userQueries',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      staleTime: 10 * 60 * 1000,
      dedupingInterval: 60000,
      errorRetryCount: 1,
    }
  );

  return { data, error, isLoading, mutate };
}
