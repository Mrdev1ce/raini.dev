import GL from "./gl";

export type TVertexScript = string;
export type TFragmentScript = string;

const vertShader: TVertexScript = require("../assets/shaders/simple.vert");
const fragShader: TFragmentScript = require("../assets/shaders/water.frag");

export interface IRainRendererOptions {
  minRefraction: number;
  maxRefraction: number;
  brightness: number;
  alphaMultiply: number;
  alphaSubtract: number;
}

export default class RainRenderer {
  private readonly _gl: GL;
  private readonly _width: number;
  private readonly _height: number;
  private readonly _options: IRainRendererOptions;

  public constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly canvasLiquid: HTMLCanvasElement,
    private readonly imageFg: TexImageSource,
    private readonly imageBg: TexImageSource,
    options: Partial<IRainRendererOptions> = {},
  ) {
    this._width = this.canvas.width || 0;
    this._height = this.canvas.height || 0;
    this._gl = new GL(this.canvas, vertShader, fragShader);

    this._options = {
      ...{
        minRefraction: 256,
        maxRefraction: 512,
        brightness: 1,
        alphaMultiply: 10,
        alphaSubtract: 2.5,
      },
      ...options,
    };

    this._gl.createUniform("2f", "resolution", this._width, this._height);
    this._gl.createUniform("1f", "textureRatio", this.imageBg.width / this.imageBg.height);
    this._gl.createUniform("1f", "minRefraction", this._options.minRefraction);
    this._gl.createUniform(
      "1f",
      "refractionDelta",
      this._options.maxRefraction - this._options.minRefraction,
    );
    this._gl.createUniform("1f", "brightness", this._options.brightness);
    this._gl.createUniform("1f", "alphaMultiply", this._options.alphaMultiply);
    this._gl.createUniform("1f", "alphaSubtract", this._options.alphaSubtract);

    this._gl.createTexture(null, 0);
    this._gl.createTexture(this.imageFg, 1);
    this._gl.createTexture(this.imageBg, 2);

    this._gl.createUniform("1i", "textureFg", 1);
    this._gl.createUniform("1i", "textureBg", 2);

    this.draw();
  }

  public draw(): void {
    this._gl.activeTexture(0);
    this._gl.updateTexture(this.canvasLiquid);
    this._gl.draw();

    requestAnimationFrame(this.draw.bind(this));
  }
}
