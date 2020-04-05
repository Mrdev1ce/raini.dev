import { Global } from "@emotion/core";
import styled from "@emotion/styled";
import { Router } from "@reach/router";
import "highlight.js/styles/darcula.css";
import "normalize.css/normalize.css";
import React, { lazy, ReactElement, StrictMode, Suspense, useState } from "react";
import FullPageLoader from "./components/FullPageLoader";
import { getTheme, ThemeContext } from "./context/ThemeContext";
import { getGlobalStyles } from "./core/getGlobalStyles";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const DocsPage = lazy(() => import("./pages/DocsPage"));
const Footer = lazy(() => import("./components/Footer"));

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
`;

export const App = (): ReactElement => {
  const themeHook = useState(getTheme("dark"));
  const [theme] = themeHook;
  const { Provider: ThemeProvider } = ThemeContext;

  return (
    <StrictMode>
      <Suspense fallback={<FullPageLoader />}>
        <ThemeProvider value={themeHook}>
          <Global styles={getGlobalStyles(theme)} />
          <PageWrapper>
            <Main>
              <Router>
                <LandingPage path="/" />
                <DocsPage path="/docs/:repository" />
              </Router>
            </Main>
            <Footer />
          </PageWrapper>
        </ThemeProvider>
      </Suspense>
    </StrictMode>
  );
};
