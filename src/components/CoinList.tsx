import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Coins } from '@/types/CoinPaprika';
import { getCoinList } from '@/api';
// import fakeList from '@/testDoubles/fakes/fakeList.json';
import { useNavigate } from 'react-router-dom';

export default function CoinList() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery<Coins[]>({
    queryKey: ['coinList'],
    queryFn: () => getCoinList(),
    // queryFn: () => new Promise((resolve) => resolve(fakeList as Coins[])).then((res) => res as Coins[])
  });

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>{error.message}</div>;

  return (
    <div>
      <ul>
        {data &&
          data.slice(0, 10).map(({ id, symbol }) => (
            <li key={id} onClick={() => navigate(`/${id}/chart`)}>
              <img
                src={`https://coinicons-api.vercel.app/api/icon/${symbol.toLocaleLowerCase()}`}
                alt={id}
              />
              <b>{id}</b>
            </li>
          ))}
      </ul>
    </div>
  );
}
