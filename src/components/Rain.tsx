import styled from "@emotion/styled";
import { IThemeAware, ThemeContext } from "../context/ThemeContext";
import React, { ReactElement, useContext, useEffect } from "react";
import RainRenderer from "../core/rain/RainRenderer";
import { createCanvas, createImageElements } from "../core/rain/RainUtils";
import Raindrops from "../core/rain/Raindrops";
import { getCurrentBrowser, TBrowser } from "../utils/getCurrentBrowser";

const Header = styled.header<IThemeAware>(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  width: "100vw",
  position: "relative",
  backgroundColor: theme.DARKER,
  justifyContent: "center",
  alignItems: "center",
  color: theme.TEXT_MAIN,
  textShadow: `3px 3px 2px ${theme.DARKER}`,
  "*": {
    zIndex: 2,
  },
  canvas: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
}));

const Canvas = styled.canvas({
  position: "absolute",
});

export default function Rain({ children }: any): ReactElement {
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    const currentBrowser = getCurrentBrowser(navigator);
    const slowWebGlBrowsers: TBrowser[] = ["firefox", "safari"];

    if (slowWebGlBrowsers.includes(currentBrowser)) {
      const header = document.querySelector("header");

      if (!header) {
        return;
      }

      header.style.background = `url(${require("../assets/img/texture-rain-bg.png")}) no-repeat center/cover`;
      return;
    }

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
    <Header theme={theme}>
      <Canvas id="container" />
      {children}
    </Header>
  );
}
