import styled from "@emotion/styled";
import { Loader } from "./Loader";
import React from "react";

const FullPageLoaderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function FullPageLoader() {
  return (
    <FullPageLoaderWrapper>
      <Loader />
    </FullPageLoaderWrapper>
  );
}
