import { Router } from "@reach/router"
import React, { lazy, StrictMode, Suspense } from "react"
import { GlobalStyles } from "./components/GlobalStyles"
import { Navigation } from "./components/Navigation"
import { Routes } from "./routes"
import LoaderPage from "./pages/LoaderPage"

const LandingPage = lazy(() => import("./pages/LandingPage"))
const DocsPage = lazy(() => import("./pages/DocsPage"))

export const App = () => (
  <Suspense fallback={<LoaderPage />}>
    <StrictMode>
      <GlobalStyles />
      <header>
        <Navigation />
      </header>
      <Router>
        <LandingPage path={Routes.HOME} />
        <DocsPage path={Routes.DOCS} />
      </Router>
    </StrictMode>
  </Suspense>
)
