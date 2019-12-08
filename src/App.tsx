import React, { lazy, ReactElement, StrictMode, Suspense, useState } from "react";
import { getTheme, ThemeContext } from "./context/ThemeContext";
import { Global } from "@emotion/core";
import { Router } from "@reach/router";
import "normalize.css/normalize.css";
import "highlight.js/styles/darcula.css";
import { getGlobalStyles } from "./core/getGlobalStyles";
import FullPageLoader from "./components/FullPageLoader";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const DocsPage = lazy(() => import("./pages/DocsPage"));
const Footer = lazy(() => import("./components/Footer"));

export const App = (): ReactElement => {
  const themeHook = useState(getTheme("dark"));
  const [theme] = themeHook;
  const { Provider: ThemeProvider } = ThemeContext;

  return (
    <StrictMode>
      <Suspense fallback={<FullPageLoader />}>
        <ThemeProvider value={themeHook}>
          <Global styles={getGlobalStyles(theme)} />
          <Router>
            <LandingPage path="/" />
            <DocsPage path="/docs/:repository" />
          </Router>
          <Footer />
        </ThemeProvider>
      </Suspense>
    </StrictMode>
  );
};
