import useSWR from 'swr';
import fetcher from '../_libs/fetcher';

export default function useInTransitOrders() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/inTransitOrders',
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
