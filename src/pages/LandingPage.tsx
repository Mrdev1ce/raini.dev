import styled from "@emotion/styled";
import React, { lazy } from "react";
import { IPathAware } from "../core/IPathAware";

const Rain = lazy(() => import("../components/Rain"));

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

export default function LandingPage(_: IPathAware) {
  return (
    <Rain>
      <IntroSection>
        <Title>raini</Title>
      </IntroSection>
    </Rain>
  );
}
