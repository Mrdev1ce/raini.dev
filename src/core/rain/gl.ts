import { TFragmentScript, TVertexScript } from "./RainRenderer";
import { createShader } from "./RainUtils";

export type GLUniformType = "1f" | "1i" | "2f" | "2i" | "3f" | "3i" | "4f" | "4i";

export type CreateUniformRestParams = Array<GLfloat | GLint>;

export const enum WebGLVersion {
  webgl2 = "webgl2",
  webgl = "webgl",
  eWebgl = "experimental-webgl",
}

export default class GL {
  private readonly _gl!: WebGLRenderingContext;
  private readonly _program!: WebGLProgram;

  public constructor(
    canvas: HTMLCanvasElement,
    private readonly vert: TVertexScript,
    private readonly frag: TFragmentScript,
    glOptions: WebGLContextAttributes = { alpha: true },
  ) {
    const partial = (options: WebGLContextAttributes) => (
      context: WebGLVersion,
    ): WebGLRenderingContext | null => {
      try {
        return canvas.getContext(context, options) as WebGLRenderingContext;
      } catch (e) {
        return null;
      }
    };

    const getContext = partial(glOptions);

    const context =
      getContext(WebGLVersion.webgl2) ||
      getContext(WebGLVersion.webgl) ||
      getContext(WebGLVersion.eWebgl);

    if (!context) {
      document.body.classList.add("no-webgl");
      return;
    }

    this._gl = context;

    const vertexShader = createShader(this._gl, this.vert, this._gl.VERTEX_SHADER);
    const fragmentShader = createShader(this._gl, this.frag, this._gl.FRAGMENT_SHADER);

    const program = this._gl.createProgram();

    if (!program || !vertexShader || !fragmentShader) {
      return;
    }

    this._gl.attachShader(program, vertexShader);
    this._gl.attachShader(program, fragmentShader);

    this._gl.linkProgram(program);

    if (!this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
      console.error(`Error in program linking: ${this._gl.getProgramInfoLog(program)}`);
      this._gl.deleteProgram(program);
      return;
    }

    const positionLocation = this._gl.getAttribLocation(program, "a_position");
    const texCoordBuffer = this._gl.createBuffer();

    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, texCoordBuffer);
    this._gl.bufferData(
      this._gl.ARRAY_BUFFER,
      new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]),
      this._gl.STATIC_DRAW,
    );

    // Create a buffer for the position of the rectangle corners.
    const buffer = this._gl.createBuffer();
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
    this._gl.enableVertexAttribArray(positionLocation);
    this._gl.vertexAttribPointer(positionLocation, 2, this._gl.FLOAT, false, 0, 0);

    this._program = program;

    this._gl.useProgram(this._program);
  }

  public createTexture(source: TexImageSource | null, i: number): WebGLTexture | null {
    const texture = this._gl.createTexture();
    this.activeTexture(i);
    this._gl.bindTexture(this._gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR);

    if (source == null) {
      return texture;
    } else {
      this.updateTexture(source);
    }

    return texture;
  }

  public createUniform(type: GLUniformType, name: string, ...v: CreateUniformRestParams): void {
    const location = this._gl.getUniformLocation(this._program, `u_${name}`);
    (this._gl as any)[`uniform${type}`](location, ...v);
  }

  public activeTexture(i: number): void {
    this._gl.activeTexture((this._gl as any)[`TEXTURE${i}`]);
  }

  public updateTexture(source: TexImageSource): void {
    this._gl.texImage2D(
      this._gl.TEXTURE_2D,
      0,
      this._gl.RGBA,
      this._gl.RGBA,
      this._gl.UNSIGNED_BYTE,
      source,
    );
  }

  public draw(): void {
    this._gl.bufferData(
      this._gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      this._gl.STATIC_DRAW,
    );

    this._gl.drawArrays(this._gl.TRIANGLES, 0, 6);
  }
}
