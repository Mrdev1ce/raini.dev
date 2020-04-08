import styled from "@emotion/styled"
import React from "react"

const Loader = styled.div`
  background: url(${require("../assets/img/loading.svg")}) no-repeat center/cover top;
  height: 50px;
  width: 50px;
  z-index: 1;
`

const FullPageLoaderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function FullPageLoader() {
  return (
    <FullPageLoaderWrapper>
      <Loader />
    </FullPageLoaderWrapper>
  )
}
