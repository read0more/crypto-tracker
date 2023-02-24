import React from 'react';
import { CoinDetailOutletContext } from '@/pages/Detail';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CoinPrice } from '@/types/CoinPaprika';
import fakePrice from '@/testDoubles/fakes/fakePrice.json';

export default function PriceTab() {
  const { coinId } = useOutletContext<CoinDetailOutletContext>();
  const { isLoading, data } = useQuery<CoinPrice>({
    queryKey: ['price', coinId],
    // queryFn: () => getCoinDetail(coinId),
    queryFn: () =>
      new Promise((resolve) => resolve(fakePrice as CoinPrice)).then(
        (res) => res as CoinPrice
      ),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.quotes &&
        Object.keys(data.quotes).map((key) => {
          return (
            <li key={key}>
              <h2>{key} All-Time High</h2>
              <span>
                date: {new Date(data.quotes[key].ath_date).toLocaleDateString()}
              </span>
              <span>price: ${data.quotes[key].ath_price.toLocaleString()}</span>
            </li>
          );
        })}
    </ul>
  );
}
