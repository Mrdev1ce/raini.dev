import React, { ReactElement, StrictMode, useState } from "react";
import { ThemeContext, getTheme } from "./context/ThemeContext";
import "normalize.css/normalize.css";
import LandingPage from "./landing-page";

export const App = (): ReactElement => {
  const themeHook = useState(getTheme("dark"));
  const { Provider: ThemeProvider } = ThemeContext;

  return (
    <StrictMode>
      <ThemeProvider value={themeHook}>
        {/* Suspense is not supported in React SSR */}
        {/*<Suspense fallback={<h1>Loading...</h1>}>*/}
        <LandingPage />
        {/*</Suspense>*/}
      </ThemeProvider>
    </StrictMode>
  );
};
