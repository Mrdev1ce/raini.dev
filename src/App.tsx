import React, { ReactElement, StrictMode, useState } from "react";
import { getTheme, ThemeContext } from "./context/ThemeContext";
import "normalize.css/normalize.css";
import LandingPage from "./landing-page";
import { css, Global } from "@emotion/core";

// TODO: Image by <a href="https://pixabay.com/users/MabelAmber-1377835/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3881675">Mabel Amber, still incognito...</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3881675">Pixabay</a>

const globalStyles = css`
  body {
    overflow-x: hidden;
    font-family: "Avenir Next", Avenir, "Helvetica Neue", "Lato", "Segoe UI", Helvetica, Arial,
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Caveat Brush", sans-serif;
  }
`;

export const App = (): ReactElement => {
  const themeHook = useState(getTheme("dark"));
  const { Provider: ThemeProvider } = ThemeContext;

  return (
    <StrictMode>
      <Global styles={globalStyles} />
      <ThemeProvider value={themeHook}>
        <LandingPage />
      </ThemeProvider>
    </StrictMode>
  );
};
