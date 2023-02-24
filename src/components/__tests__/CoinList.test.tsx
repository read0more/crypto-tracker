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

const renderCoinList = () => {
  return render(
    <Wrapper>
      <CoinList />
    </Wrapper>
  );
};

describe('CoinList', () => {
  it('API로 받은 코인 데이터 렌더링', async () => {
    const { findByText } = renderCoinList();

    for (const { id } of fakeList) {
      findByText(id);
    }
  });

  it('API로 받은 코인 데이터를 통해 이미지 가져오는지 확인', async () => {
    const { findByAltText } = renderCoinList();

    for (const { id, symbol } of fakeList) {
      const img = await findByAltText(id);
      expect(img).toHaveAttribute(
        'src',
        `https://coinicons-api.vercel.app/api/icon/${symbol.toLocaleLowerCase()}`
      );
    }
  });
});
