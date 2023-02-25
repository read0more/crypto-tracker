import React from 'react';
import { CoinDetailOutletContext } from '@/pages/Detail';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CoinPrice } from '@/types/CoinPaprika';
import styled from 'styled-components';
import { getCoinPrice } from '@/api';

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  padding: 1em;
  font-size: 1.2rem;
  border-radius: 0.5em;
`;

const H2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5em;
`;

export default function PriceTab() {
  const { coinId } = useOutletContext<CoinDetailOutletContext>();
  const { isLoading, data } = useQuery<CoinPrice>({
    queryKey: ['price', coinId],
    queryFn: () => getCoinPrice(coinId),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Ul>
      {data?.quotes &&
        Object.keys(data.quotes).map((key) => {
          return (
            <li key={key}>
              <H2>{key} All-Time High</H2>
              <div>
                date: {new Date(data.quotes[key].ath_date).toLocaleDateString()}
              </div>
              <div>price: ${data.quotes[key].ath_price.toLocaleString()}</div>
            </li>
          );
        })}
    </Ul>
  );
}
