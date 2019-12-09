import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Header } from "./Header";
import styled from "@emotion/styled";

const NoRainHeader = styled(Header)`
  background: url(${require("../assets/img/texture-rain-bg.png")}) no-repeat center/cover;
`;

export default function NoRain({ children }: any) {
  const [theme] = useContext(ThemeContext);

  return <NoRainHeader theme={theme}>{children}</NoRainHeader>;
}
