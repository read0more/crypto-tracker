import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CoinList from '@/components/CoinList';
import fakeList from '@/testDoubles/fakes/fakeList.json';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
function Wrapper({ children }: { children: JSX.Element }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

it('API로 받은 코인 데이터 렌더링', async () => {
  const { findByText } = render(
    <Wrapper>
      <CoinList />
    </Wrapper>
  );

  for (const { id } of fakeList) {
    findByText(id);
  }
});
