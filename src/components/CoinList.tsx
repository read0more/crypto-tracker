import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Coins } from '@/types/CoinPaprika';

export default function CoinList() {
  const { isLoading, error, data } = useQuery<Coins[]>({
    queryKey: ['coinList'],
    queryFn: () =>
      fetch('https://api.coinpaprika.com/v1/coins').then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>{error.message}</div>;

  return <div>{data && data.map(({ id }) => <div key={id}>{id}</div>)}</div>;
}
