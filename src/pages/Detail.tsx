import React from 'react';
import CoinDetailDescription from '@/components/CoinDetailDescription';
import CoinDetailNav from '@/components/CoinDetailNav';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export interface CoinDetailOutletContext {
  coinId: string;
}

const H1 = styled.h1`
  display: block;
  font-size: 3em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1em;
`;
export default function Detail() {
  const { id } = useParams();
  const coinId = id as string;
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')}>⬅️</button>
      <H1>{id}</H1>
      <CoinDetailDescription coinId={coinId} />
      <CoinDetailNav />
      <Outlet context={{ coinId }} />
    </div>
  );
}
