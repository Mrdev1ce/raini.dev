import { ThemeContext } from "../context/ThemeContext";
import React, { PropsWithChildren, ReactElement, useContext, useEffect } from "react";
import RainRenderer from "../core/rain/RainRenderer";
import { createCanvas, createImageElements } from "../core/rain/RainUtils";
import Raindrops from "../core/rain/Raindrops";
import { MainWrapper } from "./MainWrapper";
import { Canvas } from "./Canvas";

export default function Rain({ children }: PropsWithChildren<{}>): ReactElement {
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

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const raindrops = new Raindrops(canvas.width, canvas.height, 1, dropAlpha, dropColor);

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
    <MainWrapper theme={theme}>
      <Canvas id="container" />
      {children}
    </MainWrapper>
  );
}
