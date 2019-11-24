import styled from "@emotion/styled";
import { getTheme, ThemeContext } from "../context/ThemeContext";
import * as React from "react";
import { ReactElement, useContext, useEffect } from "react";
import RainRenderer from "./rain-renderer";
import { createCanvas, createImageElements } from "./RainUtils";
import Raindrops from "./raindrops";

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

const Canvas = styled.canvas({
  position: "absolute",
});

const Loader = styled.div({
  background: `url(${require("../assets/img/loading.svg")}) no-repeat center top`,
  backgroundSize: "cover",
  height: "44px",
  width: "44px",
  zIndex: 1,
});
const Title = styled.h1(({ theme }: any) => ({
  color: theme.TEXT_LIGHT,
  fontSize: "10rem",
  textShadow: `3px 3px 2px ${theme.TEXT_DARK}`,
}));
const IntroSection = styled.section({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
});

export default function LandingPage(): ReactElement {
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    createImageElements([
      require("../assets/img/drop-alpha.png"),
      require("../assets/img/drop-color.png"),
      require("../assets/img/texture-rain-fg.png"),
      require("../assets/img/texture-rain-bg.png"),
    ]).then(([dropAlpha, dropColor, fg, bg]) => {
      const textureBgSize = {
        width: 384,
        height: 256,
      };

      const textureFgSize = {
        width: 96,
        height: 64,
      };

      const canvas = document.querySelector("#container") as HTMLCanvasElement;

      const dpi = window.devicePixelRatio;

      canvas.width = window.innerWidth * dpi;
      canvas.height = window.innerHeight * dpi;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      const raindrops = new Raindrops(canvas.width, canvas.height, dpi, dropAlpha, dropColor);

      const textureFg = createCanvas(textureFgSize.width, textureFgSize.height);
      const textureFgCtx = textureFg.getContext("2d");

      if (!textureFgCtx) {
        return;
      }

      textureFgCtx.globalAlpha = 1;
      textureFgCtx.drawImage(fg, 0, 0, textureFgSize.width, textureFgSize.height);

      const textureBg = createCanvas(textureBgSize.width, textureBgSize.height);
      const textureBgCtx = textureBg.getContext("2d");

      if (!textureBgCtx) {
        return;
      }

      textureBgCtx.globalAlpha = 1;
      textureBgCtx.drawImage(bg, 0, 0, textureBgSize.width, textureBgSize.height);

      new RainRenderer(canvas, raindrops.canvas, textureFg, textureBg);
    });
  }, []);

  return (
    <Header>
      <Canvas id="container" />
      <IntroSection>
        <Title theme={theme}>raini</Title>
        <Loader />
      </IntroSection>
    </Header>
  );
}
