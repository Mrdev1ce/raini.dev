import styled from "@emotion/styled";
import { getTheme } from "../context/ThemeContext";
import { ReactElement } from "react";
import * as React from "react";

const Header = styled.header({
  display: "flex",
  height: "100vh",
  width: "100vw",
  backgroundColor: getTheme("dark").DARKER,
  justifyContent: "center",
  alignItems: "center",
  "*": {
    zIndex: 2,
  },
  canvas: {
    zIndex: 1,
    boxShadow: "0 3px 15px rgba(0,0,0,0.5)",
  },
});

export default function LandingPage(): ReactElement {
  return <Header />;
}
