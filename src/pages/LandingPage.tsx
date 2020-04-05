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

const DescriptionWrapper = styled.div`
  width: 50%;
  max-width: 800px;
  background: rgba(0, 0, 0, 0.2);
  border: 0;
  border-radius: 4px;
  padding: 5px 20px;
`;

export default function LandingPage(_: IPathAware) {
  return (
    <Rain>
      <IntroSection>
        <Title>raini</Title>
        <DescriptionWrapper>
          <h3>
            A free open source platform for creating and sharing educational programs related to
            software development and all the things around it.
          </h3>
        </DescriptionWrapper>
      </IntroSection>
    </Rain>
  );
}
