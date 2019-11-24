import { TFragmentScript, TVertexScript } from "./rain-renderer";

/**
 * Interpolation function type.
 */
type TInterpolation = (x: number) => number;

/**
 * I-Combinator.
 */
export const id = <T>(x: T): T => x;

/**
 * Execute provided function given amount of times.
 * Provides current index to the function as a parameter.
 */
export const times = (n: number, f: (x: number) => void): void => {
  for (let i = 0; i < n; i++) {
    f(i);
  }
};

/**
 * Generate random number in given range.
 * Optional "interpolation" argument defaults to I-Combinator.
 */
export const random = (from = 0, to = 1, interpolation: TInterpolation = id): number =>
  from + interpolation(Math.random()) * (to - from);

/**
 * Check if argument is high enough to happen (higher than raw "random()" result).
 */
export const chance = (c: number): boolean => random() <= c;

/**
 * Create image with given source assigned.
 */
export const createImageElement = (source: string): Promise<HTMLImageElement> =>
  new Promise(resolve => {
    const img = new Image();
    img.src = source;
    img.alt = "";
    img.addEventListener("load", () => {
      resolve(img);
    });
  });

/**
 * Create images with given sources assigned.
 */
export const createImageElements = (sources: string[]): Promise<HTMLImageElement[]> =>
  Promise.all(sources.map(createImageElement));

/**
 * Create canvas element with given width and height.
 */
export const createCanvas = (width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

/**
 * Create shader based on given script using provided WebGL context.
 */
export const createShader = (
  gl: WebGLRenderingContext,
  script: TFragmentScript | TVertexScript,
  type: GLenum,
): WebGLShader | null => {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, script);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`Error compiling shader '${shader}': ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};
