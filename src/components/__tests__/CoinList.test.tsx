import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CoinList from '@/components/CoinList';
import fakeList from '@/testDoubles/fakes/fakeList.json';
import * as router from 'react-router';

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

const list = fakeList.slice(0, 5);
const navigate = vi.fn();

describe('CoinList', () => {
  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('API로 받은 코인 데이터 렌더링', async () => {
    const { findByText } = renderCoinList();

    for (const { id } of list) {
      await findByText(id);
    }
  });

  it('API로 받은 코인 데이터를 통해 이미지 가져오는지 확인', async () => {
    const { findByAltText } = renderCoinList();

    for (const { id, symbol } of list) {
      const img = await findByAltText(id);
      expect(img).toHaveAttribute(
        'src',
        `https://coinicons-api.vercel.app/api/icon/${symbol.toLocaleLowerCase()}`
      );
    }
  });

  it('리스트 클릭하면 해당 detail 페이지로 가는지', async () => {
    const { findByText } = renderCoinList();
    (await findByText(list[0].id)).click();
    expect(navigate).toHaveBeenCalledWith(`/${list[0].id}/chart`);
  });
});
