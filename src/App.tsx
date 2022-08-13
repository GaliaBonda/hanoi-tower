import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import GameField from './components/GameField/GameField';
import Stack from './components/Stack/Stack';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
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
