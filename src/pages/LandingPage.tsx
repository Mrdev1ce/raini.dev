import React, { lazy } from "react";
import { IPathAware } from "../core/IPathAware";
import { IShowRainAware } from "../core/IShowRainAware";
import styled from "@emotion/styled";

const Rain = lazy(() => import("../components/Rain"));
const NoRain = lazy(() => import("../components/NoRain"));

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 10rem;
  line-height: 0;
`;

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
