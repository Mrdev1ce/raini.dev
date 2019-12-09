import React, { lazy, ReactElement, StrictMode, Suspense, useEffect, useState } from "react";
import { getTheme, ThemeContext } from "./context/ThemeContext";
import { Global } from "@emotion/core";
import { Router } from "@reach/router";
import "normalize.css/normalize.css";
import "highlight.js/styles/darcula.css";
import { getGlobalStyles } from "./core/getGlobalStyles";
import FullPageLoader from "./components/FullPageLoader";
import { getCurrentBrowser, TBrowser } from "./utils/getCurrentBrowser";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const DocsPage = lazy(() => import("./pages/DocsPage"));
const Footer = lazy(() => import("./components/Footer"));

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
          <Router>
            <LandingPage showRain={showRain} path="/" />
            <DocsPage showRain={showRain} path="/docs/:repository" />
          </Router>
          <Footer />
        </ThemeProvider>
      </Suspense>
    </StrictMode>
  );
};
