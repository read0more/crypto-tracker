import React from 'react';
import CoinDetailDescription from '@/components/CoinDetailDescription';
import CoinDetailNav from '@/components/CoinDetailNav';
import { Outlet, useParams, useNavigate } from 'react-router-dom';

export interface CoinDetailOutletContext {
  coinId: string;
}

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      Detail: {id}
      <button onClick={() => navigate('/')}>⬅️</button>
      <CoinDetailDescription coinId='id' />
      <CoinDetailNav />
      <Outlet context={{ coinId: id }} />
    </div>
  );
}
