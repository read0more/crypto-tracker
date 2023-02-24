import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Coins } from '@/types/CoinPaprika';
import { getCoinList } from '@/api';

export default function CoinList() {
  const { isLoading, error, data } = useQuery<Coins[]>({
    queryKey: ['coinList'],
    queryFn: () => getCoinList(),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>{error.message}</div>;

  return <div>{data && data.map(({ id }) => <div key={id}>{id}</div>)}</div>;
}
