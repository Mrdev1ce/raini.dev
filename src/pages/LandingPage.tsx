import React, { lazy } from "react";
import { IPathAware } from "../core/IPathAware";
import { IShowRainAware } from "../core/IShowRainAware";
import { IntroSection } from "../components/IntroSection";
import { Title } from "../components/Title";

const Rain = lazy(() => import("../components/Rain"));
const NoRain = lazy(() => import("../components/NoRain"));

export default function LandingPage({ showRain }: IPathAware & IShowRainAware) {
  const Wrapper = showRain ? Rain : NoRain;

  return (
    <Wrapper>
      <IntroSection>
        <Title>raini</Title>
      </IntroSection>
    </Wrapper>
  );
}
