import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  const user = userEvent.setup();

  it('Chart 탭 클릭하면 /chart로 url 바뀌는지', async () => {
    renderCoinDetailNav();
    // fireEvent.click(screen.getByText('Chart'));
    await user.click(screen.getByText('Chart'));
    expect(window.location.pathname).toBe(`/chart`);
  });

  it('Price 탭 클릭하면 /price로 url 바뀌는지', async () => {
    renderCoinDetailNav();
    // fireEvent.click(screen.getByText('Price'));
    await user.click(screen.getByText('Price'));
    expect(window.location.pathname).toBe(`/price`);
  });
});
