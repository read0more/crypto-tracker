import React from 'react';
import { getCoinDetail, getCoinPrice } from '@/api';
import { CoinDetail, CoinPrice } from '@/types/CoinPaprika';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

interface Props {
  coinId: string;
}

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  font-size: 1.2rem;
  font-weight: 700;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.backgroundColor};
  border-radius: 0.5em;
`;

const I = styled.i`
  display: block;
  font-style: italic;
  font-size: 1.2rem;
  margin: 1.5em 0;
`;

export default function CoinDetailDescription({ coinId }: Props) {
  const { isLoading: detailLoading, data: detailData } = useQuery<CoinDetail>({
    queryKey: ['detail', coinId],
    queryFn: () => getCoinDetail(coinId),
  });

  const { isLoading: priceLoading, data: priceData } = useQuery<CoinPrice>({
    queryKey: ['price', coinId],
    queryFn: () => getCoinPrice(coinId),
  });

  const loading = detailLoading || priceLoading;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Ul>
        <li>RANK: {detailData?.rank}</li>
        <li>SYMBOL: {detailData?.symbol}</li>
        <li>PRICE: ${priceData?.quotes?.USD.price}</li>
      </Ul>
      <I>{detailData?.description}</I>
      <Ul>
        <li>TOTAL SUPPLY: {priceData?.total_supply}</li>
        <li>MAX SUPPLY: {priceData?.max_supply}</li>
      </Ul>
    </div>
  );
}
