import React, { lazy, ReactElement, StrictMode, Suspense, useEffect, useState } from "react";
import { getTheme, ThemeContext } from "./context/ThemeContext";
import { Global } from "@emotion/core";
import { Router } from "@reach/router";
import "normalize.css/normalize.css";
import "highlight.js/styles/darcula.css";
import { getGlobalStyles } from "./core/getGlobalStyles";
import FullPageLoader from "./components/FullPageLoader";
import { getCurrentBrowser, TBrowser } from "./utils/getCurrentBrowser";
import styled from "@emotion/styled";
import Header from "./components/Header";

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
  const [showRain, setShowRain] = useState<boolean>(true);
  const [theme] = themeHook;
  const { Provider: ThemeProvider } = ThemeContext;

  useEffect(() => {
    const currentBrowser = getCurrentBrowser(navigator);
    const slowWebGlBrowsers: TBrowser[] = ["firefox", "safari"];
    if (slowWebGlBrowsers.includes(currentBrowser)) {
      setShowRain(false);
    }
  }, [showRain, setShowRain]);

  return (
    <StrictMode>
      <Suspense fallback={<FullPageLoader />}>
        <ThemeProvider value={themeHook}>
          <Global styles={getGlobalStyles(theme)} />
          <PageWrapper>
            <Header />
            <Main>
              <Router>
                <LandingPage showRain={showRain} path="/" />
                <DocsPage showRain={showRain} path="/docs/:repository" />
              </Router>
            </Main>
            <Footer />
          </PageWrapper>
        </ThemeProvider>
      </Suspense>
    </StrictMode>
  );
};
