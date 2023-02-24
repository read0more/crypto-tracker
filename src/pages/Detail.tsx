import CoinDetailNav from '@/components/CoinDetailNav';
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();

  return (
    <div>
      Detail: {id}
      <CoinDetailNav />
      <Outlet context={{ id }} />
    </div>
  );
}
