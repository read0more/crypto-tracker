import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Coins } from '@/types/CoinPaprika';
import { getCoinList } from '@/api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Image = styled.img`
  max-width: 50px;
`;

const Ul = styled.ul`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex-grow: 1;
`;
const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5em;
  font-weight: 700;
`;

export default function CoinList() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery<Coins[]>({
    queryKey: ['coinList'],
    queryFn: () => getCoinList(),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>{error.message}</div>;

  return (
    <Ul>
      {data &&
        data.slice(0, 10).map(({ id, symbol }) => (
          <Li key={id} onClick={() => navigate(`/${id}/chart`)}>
            <Image
              src={`https://coinicons-api.vercel.app/api/icon/${symbol.toLocaleLowerCase()}`}
              alt={id}
            />
            <b>{id}</b>
            <span>➡️</span>
          </Li>
        ))}
    </Ul>
  );
}
