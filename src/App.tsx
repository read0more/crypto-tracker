import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Reset } from 'styled-reset';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { useRecoilState } from 'recoil';
import { isDarkAtom } from './atoms';

const queryClient = new QueryClient();
const GlobalStyle = createGlobalStyle`
  body {
    display: block;
    font-family: 'Roboto Condensed', sans-serif;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
  }

  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

const lightTheme = {
  textColor: 'black',
  backgroundColor: 'white',
};

const darkTheme = {
  textColor: '#03C988',
  backgroundColor: '#13005A',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1024px;
  margin: auto;
`;

const Button = styled.button`
  align-self: flex-end;
`;

function App() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const currentThemeName = isDark ? 'dark' : 'light';

  return (
    <>
      <Reset />

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Container>
            <Button onClick={() => setIsDark((prev) => !prev)}>
              Toggle {currentThemeName} mode
            </Button>
            <RouterProvider router={Router} />
          </Container>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
