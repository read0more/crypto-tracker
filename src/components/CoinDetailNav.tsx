import React from 'react';
import { Link } from 'react-router-dom';

// TODO: detail 페이지 하단 부분. 적절한 이름 생각나면 변경 필요
export default function CoinDetailNav() {
  return (
    <ul>
      <li>
        <Link to='price'>Price</Link>
      </li>
      <li>
        <Link to='chart'>Chart</Link>
      </li>
    </ul>
  );
}
