import { Theme } from "../context/ThemeContext";
import { css } from "@emotion/core";

export const getGlobalStyles = (theme: Theme) => css`
  body {
    overflow-x: hidden;
    font-family: "Avenir Next", Avenir, "Helvetica Neue", "Lato", "Segoe UI", Helvetica, Arial,
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.DARK};
  }

  h1 {
    font-family: "Caveat Brush", sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
    text-shadow: 3px 3px 2px ${theme.DARKER};
  }

  a,
  a:hover,
  a:visited,
  a:active {
    font-weight: bold;
    text-decoration: none;
    color: ${theme.TEXT_MAIN};
  }

  a:hover {
    text-decoration: underline;
  }
`;
