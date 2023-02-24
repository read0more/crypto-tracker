import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CoinDetailNav from '@/components/CoinDetailNav';
import { BrowserRouter } from 'react-router-dom';

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

// TODO: Warning: An update to BrowserRouter inside a test was not wrapped in act(...). 해결 필요
const renderCoinDetailNav = () => {
  return render(
    <Wrapper>
      <BrowserRouter>
        <CoinDetailNav />
      </BrowserRouter>
    </Wrapper>
  );
};

describe('CoinDetailNav', () => {
  it('Chart 탭 클릭하면 /chart로 url 바뀌는지', async () => {
    const { findByText } = renderCoinDetailNav();
    (await findByText('Chart')).click();
    expect(window.location.pathname).toBe(`/chart`);
  });

  it('Price 탭 클릭하면 /price로 url 바뀌는지', async () => {
    const { findByText } = renderCoinDetailNav();
    (await findByText('Price')).click();
    expect(window.location.pathname).toBe(`/price`);
  });
});
