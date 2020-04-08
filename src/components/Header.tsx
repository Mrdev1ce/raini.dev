import styled from "@emotion/styled"
import React, { PropsWithChildren, useEffect } from "react"
import Raindrops from "../rain/Raindrops"
import RainRenderer from "../rain/RainRenderer"
import { createCanvas, createImageElements } from "../rain/RainUtils"

const RainCanvas = styled.canvas`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 0;
  width: 100vw;
  height: auto;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
`

const StyledHeader = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 130px 20px 50px;
  flex-wrap: wrap;
  background: linear-gradient(to right, #f5edf0, #d3dde8);
`

export const Header = ({ children }: PropsWithChildren<{}>) => {
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
      }

      const textureFgSize = {
        width: 96,
        height: 64,
      }

      const canvas = document.querySelector("#container") as HTMLCanvasElement

      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || 1000

      const raindrops = new Raindrops(canvas.width, canvas.height, 1, dropAlpha, dropColor)

      const textureFg = createCanvas(textureFgSize.width, textureFgSize.height)
      const textureFgCtx = textureFg.getContext("2d")

      if (!textureFgCtx) {
        return
      }

      textureFgCtx.globalAlpha = 1
      textureFgCtx.drawImage(fg, 0, 0, textureFgSize.width, textureFgSize.height)

      const textureBg = createCanvas(textureBgSize.width, textureBgSize.height)
      const textureBgCtx = textureBg.getContext("2d")

      if (!textureBgCtx) {
        return
      }

      textureBgCtx.globalAlpha = 1
      textureBgCtx.drawImage(bg, 0, 0, textureBgSize.width, textureBgSize.height)

      new RainRenderer(canvas, raindrops.canvas, textureFg, textureBg)
    })
  }, [])

  return (
    <StyledHeader>
      {children}
      <RainCanvas id="container" />
    </StyledHeader>
  )
}
