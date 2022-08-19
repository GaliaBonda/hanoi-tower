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

  *:focus {
    border: none;
    outline: none;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: #c8edd7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const onClick = () => {
    console.log('test');
  };
  return (
    <Wrapper>
      <GlobalStyle />
      <GameField />
      <button onClick={onClick}>Test</button>
    </Wrapper>
  );
}

export default App;
