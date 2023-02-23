import React from 'react';
import { render } from '@testing-library/react';
import CoinList from '../CoinList';

it('렌더링 테스트', () => {
  const { getByText } = render(<CoinList />);
  getByText('CoinList');
});
