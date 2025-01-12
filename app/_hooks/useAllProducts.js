import useSWR from 'swr';
import fetcher from '../_libs/fetcher';

export default function useAllProducts() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/allProducts',
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
