import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 700;
`;

const StyledLink = styled(Link)`
  padding: 1em;
  margin: 1em;
  cursor: pointer;
  border-radius: 0.5em;
  background-color: ${(props) => props.theme.textColor};
  flex-basis: 50%;
`;

export default function CoinDetailNav() {
  return (
    <nav>
      <Ul>
        <StyledLink to='price'>
          <li>Price</li>
        </StyledLink>
        <StyledLink to='chart'>
          <li>Chart</li>
        </StyledLink>
      </Ul>
    </nav>
  );
}
