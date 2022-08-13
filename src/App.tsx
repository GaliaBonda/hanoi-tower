import React from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';
import GameField from './components/GameField/GameField';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Comfortaa', cursive;
    font-size: 1rem;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    font-family: inherit;
  }
`

const Wrapper = styled.div`
position: relative;
height: 100vh;
width: 100%;
background-color: #c8edd7;
display: flex;
justify-content: center;
align-items: center;`;

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <GameField />
    </Wrapper>
  );
}

export default App;
