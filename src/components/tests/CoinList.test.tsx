import React from 'react';
import { render } from '@testing-library/react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CoinList from '@/components/CoinList';

// const queryClient = new QueryClient();
// function Wrapper({ children }: { children: JSX.Element }) {
//   return (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// }

it('API로 받은 코인 데이터 렌더링', () => {
  const { getByText } = render(<CoinList />);
  getByText('CoinList');
});
