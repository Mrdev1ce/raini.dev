import styled from "@emotion/styled"
import React, { PropsWithChildren } from "react"
import { ITitleAware } from "../types"

const CardComponent = styled.div`
  display: flex;
  max-width: 300px;
  z-index: 2;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 30px;
  margin: 30px;
  border-radius: 4px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
  background-color: white;
`

const CardTitle = styled.h2`
  margin: 0;
`

export const Card = ({ title, children }: PropsWithChildren<ITitleAware>) => (
  <CardComponent>
    <CardTitle>{title}</CardTitle>
    <p>{children}</p>
  </CardComponent>
)
