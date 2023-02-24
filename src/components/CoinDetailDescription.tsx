import React from 'react';
// import { getCoinList, getCoinPrice } from '@/api';
import { CoinDetail, CoinPrice } from '@/types/CoinPaprika';
import { useQuery } from '@tanstack/react-query';
import fakeDetail from '@/testDoubles/fakes/fakeDetail.json';
import fakePrice from '@/testDoubles/fakes/fakePrice.json';

interface Props {
  coinId: string;
}

export default function CoinDetailDescription({ coinId }: Props) {
  const { isLoading: detailLoading, data: detailData } = useQuery<CoinDetail>({
    queryKey: ['detail', coinId],
    // queryFn: () => getCoinDetail(coinId),
    queryFn: () =>
      new Promise((resolve) => resolve(fakeDetail as CoinDetail)).then(
        (res) => res as CoinDetail
      ),
  });

  const { isLoading: priceLoading, data: priceData } = useQuery<CoinPrice>({
    queryKey: ['price', coinId],
    // queryFn: () => getCoinDetail(coinId),
    queryFn: () =>
      new Promise((resolve) => resolve(fakePrice as CoinPrice)).then(
        (res) => res as CoinPrice
      ),
  });

  const loading = detailLoading || priceLoading;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{detailData?.rank}</h2>
      <h2>{detailData?.symbol}</h2>
      <h2>{detailData?.open_source}</h2>
      <h2>{detailData?.description}</h2>
      <h2>{priceData?.total_supply}</h2>
      <h2>{priceData?.max_supply}</h2>
    </div>
  );
}
