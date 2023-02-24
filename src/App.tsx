import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Reset } from 'styled-reset';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';

const queryClient = new QueryClient();
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
  body {
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

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const currentThemeName = theme === lightTheme ? 'dark' : 'light';
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <>
      <Reset />
      <QueryClientProvider client={queryClient}>
        <button onClick={toggleTheme}>Toggle {currentThemeName} mode</button>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={Router} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
