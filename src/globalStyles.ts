// src/globalStyles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #222;
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.white};
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    font-family: inherit;
  }
`;