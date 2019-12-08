import styled from "@emotion/styled";
import React, { lazy } from "react";
import { IPathAware } from "../core/IPathAware";

const Rain = lazy(() => import("../components/Rain"));

export const Title = styled.h1({
  fontSize: "10rem",
  lineHeight: 0,
});

export const IntroSection = styled.section({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
});

export default function LandingPage(_: IPathAware) {
  return (
    <Rain>
      <IntroSection>
        <Title>raini</Title>
      </IntroSection>
    </Rain>
  );
}
