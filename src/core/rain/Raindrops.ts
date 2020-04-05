import { chance, createCanvas, random, times } from "./RainUtils";

const DROP_SIZE = 64;

export interface IDrop {
  x: number;
  y: number;
  r: number;
  spreadX: number;
  spreadY: number;
  momentum: number;
  momentumX: number;
  lastSpawn: number;
  nextSpawn: number;
  parent: IDrop | null;
  isNew: boolean;
  killed: boolean;
  shrink: number;
}

const Drop: IDrop = {
  x: 0,
  y: 0,
  r: 0,
  spreadX: 0,
  spreadY: 0,
  momentum: 0,
  momentumX: 0,
  lastSpawn: 0,
  nextSpawn: 0,
  parent: null,
  isNew: true,
  killed: false,
  shrink: 0,
};

export default class Raindrops {
  private readonly options = {
    minR: 10,
    maxR: 20,
    maxDrops: 900,
    rainChance: 0.3,
    rainLimit: 3,
    dropletsRate: 50,
    dropletsSize: [1, 2],
    dropletsCleaningRadiusMultiplier: 1,
    raining: true,
    globalTimeScale: 1,
    trailRate: 0.5,
    autoShrink: true,
    spawnArea: [-0.1, 0.95],
    trailScaleRange: [0.1, 0.3],
    collisionRadius: 0.7,
    collisionRadiusIncrease: 0.01,
    dropFallMultiplier: 0.001,
    collisionBoostMultiplier: 0.01,
    collisionBoost: 1,
  };

  private readonly ctx: CanvasRenderingContext2D | null;
  private readonly droplets!: HTMLCanvasElement;
  private readonly dropletsCtx!: CanvasRenderingContext2D | null;
  private drops!: IDrop[];
  private dropsGfx!: (HTMLCanvasElement | null)[];
  private dropletsPixelDensity = 1;
  private dropletsCounter = 0;
  private clearDropletsGfx!: HTMLCanvasElement;
  private textureCleaningIterations = 0;
  private lastRender!: number;

  public canvas: HTMLCanvasElement;

  public constructor(
    private readonly width: number,
    private readonly height: number,
    private readonly scale: number,
    private readonly dropAlpha: HTMLImageElement,
    private readonly dropColor: HTMLImageElement,
  ) {
    this.canvas = createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext("2d");
    this.droplets = createCanvas(
      this.width * this.dropletsPixelDensity,
      this.height * this.dropletsPixelDensity,
    );

    this.dropletsCtx = this.droplets.getContext("2d");

    this.drops = [];
    this.dropsGfx = [];

    this.renderDropsGfx();

    this.update();
  }

  private drawDroplet(x: number, y: number, r: number): void {
    if (!this.dropletsCtx) {
      return;
    }

    this.drawDrop(this.dropletsCtx, {
      ...Drop,
      ...{
        x: x * this.dropletsPixelDensity,
        y: y * this.dropletsPixelDensity,
        r: r * this.dropletsPixelDensity,
      },
    });
  }

  private renderDropsGfx(): void {
    const dropBuffer = createCanvas(DROP_SIZE, DROP_SIZE);
    const dropBufferCtx = dropBuffer.getContext("2d");

    if (!dropBufferCtx) {
      return;
    }

    this.dropsGfx = [...Array(255)].map((_, i) => {
      const drop = createCanvas(DROP_SIZE, DROP_SIZE);
      const dropCtx = drop.getContext("2d");

      if (!dropCtx) {
        return null;
      }

      dropBufferCtx.clearRect(0, 0, DROP_SIZE, DROP_SIZE);

      // color
      dropBufferCtx.globalCompositeOperation = "source-over";
      dropBufferCtx.drawImage(this.dropColor, 0, 0, DROP_SIZE, DROP_SIZE);

      // blue overlay, for depth
      dropBufferCtx.globalCompositeOperation = "screen";
      dropBufferCtx.fillStyle = "rgba(0,0," + i + ",1)";
      dropBufferCtx.fillRect(0, 0, DROP_SIZE, DROP_SIZE);

      // alpha
      dropCtx.globalCompositeOperation = "source-over";
      dropCtx.drawImage(this.dropAlpha, 0, 0, DROP_SIZE, DROP_SIZE);

      dropCtx.globalCompositeOperation = "source-in";
      dropCtx.drawImage(dropBuffer, 0, 0, DROP_SIZE, DROP_SIZE);

      return drop;
    });

    // create circle that will be used as a brush to remove droplets
    this.clearDropletsGfx = createCanvas(128, 128);

    const clearDropletsCtx = this.clearDropletsGfx.getContext("2d");

    if (!clearDropletsCtx) {
      return;
    }

    clearDropletsCtx.fillStyle = "#000";
    clearDropletsCtx.beginPath();
    clearDropletsCtx.arc(64, 64, 64, 0, Math.PI * 2);
    clearDropletsCtx.fill();
  }

  private drawDrop(ctx: CanvasRenderingContext2D, drop: IDrop): void {
    if (this.dropsGfx.length > 0) {
      const x = drop.x;
      const y = drop.y;
      const r = drop.r;
      const spreadX = drop.spreadX;
      const spreadY = drop.spreadY;

      const scaleX = 1;
      const scaleY = 1.5;

      let d = Math.max(0, Math.min(1, ((r - this.options.minR) / this.deltaR) * 0.9));
      d *= 1 / ((drop.spreadX + drop.spreadY) * 0.5 + 1);

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      d = Math.floor(d * (this.dropsGfx.length - 1));

      const gfx = this.dropsGfx[d];

      if (!gfx) {
        return;
      }

      ctx.drawImage(
        gfx,
        (x - r * scaleX * (spreadX + 1)) * this.scale,
        (y - r * scaleY * (spreadY + 1)) * this.scale,
        r * 2 * scaleX * (spreadX + 1) * this.scale,
        r * 2 * scaleY * (spreadY + 1) * this.scale,
      );
    }
  }

  private clearDroplets(x: number, y: number, r = 30): void {
    if (!this.dropletsCtx) {
      return;
    }

    this.dropletsCtx.globalCompositeOperation = "destination-out";
    this.dropletsCtx.drawImage(
      this.clearDropletsGfx,
      (x - r) * this.dropletsPixelDensity * this.scale,
      (y - r) * this.dropletsPixelDensity * this.scale,
      r * 2 * this.dropletsPixelDensity * this.scale,
      r * 2 * this.dropletsPixelDensity * this.scale * 1.5,
    );
  }

  private clearCanvas(): void {
    if (!this.ctx) {
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  private createDrop(options: Partial<IDrop>): IDrop | null {
    if (this.drops.length >= this.options.maxDrops * this.areaMultiplier) {
      return null;
    }

    return {
      ...Drop,
      ...options,
    };
  }

  private updateRain(timeScale: number): IDrop[] {
    const rainDrops: IDrop[] = [];
    if (this.options.raining) {
      const rainLimit = this.options.rainLimit * timeScale * this.areaMultiplier;
      const rainChance = this.options.rainChance * timeScale * this.areaMultiplier;

      let count = 0;

      while (chance(rainChance) && count < rainLimit) {
        count++;
        const r = random(this.options.minR, this.options.maxR, (n: number) => Math.pow(n, 3));
        const rainDrop = this.createDrop({
          x: random(this.width / this.scale),
          y: random(
            (this.height / this.scale) * this.options.spawnArea[0],
            (this.height / this.scale) * this.options.spawnArea[1],
          ),
          r: r,
          momentum: 1 + (r - this.options.minR) * 0.1 + random(2),
          spreadX: 1.5,
          spreadY: 1.5,
        });
        if (rainDrop != null) {
          rainDrops.push(rainDrop);
        }
      }
    }

    return rainDrops;
  }

  private updateDroplets(timeScale: number): void {
    if (this.textureCleaningIterations > 0) {
      this.textureCleaningIterations -= timeScale;

      if (!this.dropletsCtx) {
        return;
      }

      this.dropletsCtx.globalCompositeOperation = "destination-out";
      this.dropletsCtx.fillStyle = `rgba(0,0,0,${0.05 & timeScale})`;
      this.dropletsCtx.fillRect(
        0,
        0,
        this.width * this.dropletsPixelDensity,
        this.height * this.dropletsPixelDensity,
      );
    }

    if (this.options.raining) {
      this.dropletsCounter += this.options.dropletsRate * timeScale * this.areaMultiplier;
      times(this.dropletsCounter, () => {
        this.dropletsCounter--;
        this.drawDroplet(
          random(this.width / this.scale),
          random(this.height / this.scale),
          random(this.options.dropletsSize[0], this.options.dropletsSize[1], (n: number) => n * n),
        );
      });
    }

    if (!this.ctx) {
      return;
    }

    this.ctx.drawImage(this.droplets, 0, 0, this.width, this.height);
  }

  private updateDrops(timeScale: number): void {
    const newDrops: IDrop[] = this.updateRain(timeScale);

    this.updateDroplets(timeScale);

    this.drops.sort((a, b) => {
      const va = a.y * (this.width / this.scale) + a.x;
      const vb = b.y * (this.width / this.scale) + b.x;
      return va > vb ? 1 : va == vb ? 0 : -1;
    });

    this.drops.forEach((drop, i) => {
      if (!drop.killed) {
        // update gravity
        // (chance of drops "creeping down")
        if (
          chance(
            (drop.r - this.options.minR * this.options.dropFallMultiplier) *
              (0.1 / this.deltaR) *
              timeScale,
          )
        ) {
          drop.momentum += random((drop.r / this.options.maxR) * 4);
        }

        // clean small drops
        if (this.options.autoShrink && drop.r <= this.options.minR && chance(0.05 * timeScale)) {
          drop.shrink += 0.01;
        }

        //update shrinkage
        drop.r -= drop.shrink * timeScale;
        if (drop.r <= 0) drop.killed = true;

        // update trails
        if (this.options.raining) {
          drop.lastSpawn += drop.momentum * timeScale * this.options.trailRate;
          if (drop.lastSpawn > drop.nextSpawn) {
            const trailDrop = this.createDrop({
              x: drop.x + random(-drop.r, drop.r) * 0.1,
              y: drop.y - drop.r * 0.01,
              r: drop.r * random(...this.options.trailScaleRange),
              spreadY: drop.momentum * 0.1,
              parent: drop,
            });

            if (trailDrop != null) {
              newDrops.push(trailDrop);

              drop.r *= Math.pow(0.97, timeScale);
              drop.lastSpawn = 0;
              drop.nextSpawn =
                random(this.options.minR, this.options.maxR) -
                drop.momentum * 2 * this.options.trailRate +
                (this.options.maxR - drop.r);
            }
          }
        }

        //normalize spread
        drop.spreadX *= Math.pow(0.4, timeScale);
        drop.spreadY *= Math.pow(0.7, timeScale);

        //update position
        const moved = drop.momentum > 0;
        if (moved) {
          drop.y += drop.momentum * this.options.globalTimeScale;
          drop.x += drop.momentumX * this.options.globalTimeScale;
          if (drop.y > this.height / this.scale + drop.r) {
            drop.killed = true;
          }
        }

        // collision
        const checkCollision = (moved || drop.isNew) && !drop.killed;
        drop.isNew = false;

        if (checkCollision) {
          this.drops.slice(i + 1, i + 70).forEach(drop2 => {
            //basic check
            if (
              drop != drop2 &&
              drop.r > drop2.r &&
              drop.parent != drop2 &&
              drop2.parent != drop &&
              !drop2.killed
            ) {
              const dx = drop2.x - drop.x;
              const dy = drop2.y - drop.y;
              const d = Math.sqrt(dx * dx + dy * dy);
              //if it's within acceptable distance
              if (
                d <
                (drop.r + drop2.r) *
                  (this.options.collisionRadius +
                    drop.momentum * this.options.collisionRadiusIncrease * timeScale)
              ) {
                const r1 = drop.r;
                const r2 = drop2.r;
                const a1 = Math.PI * (r1 * r1);
                const a2 = Math.PI * (r2 * r2);
                let targetR = Math.sqrt((a1 + a2 * 0.8) / Math.PI);
                if (targetR > this.options.maxR) {
                  targetR = this.options.maxR;
                }
                drop.r = targetR;
                drop.momentumX += dx * 0.1;
                drop.spreadX = 0;
                drop.spreadY = 0;
                drop2.killed = true;
                drop.momentum = Math.max(
                  drop2.momentum,
                  Math.min(
                    40,
                    drop.momentum +
                      targetR * this.options.collisionBoostMultiplier +
                      this.options.collisionBoost,
                  ),
                );
              }
            }
          });
        }

        //slowdown momentum
        drop.momentum -= Math.max(1, this.options.minR * 0.5 - drop.momentum) * 0.1 * timeScale;
        if (drop.momentum < 0) drop.momentum = 0;
        drop.momentumX *= Math.pow(0.7, timeScale);

        if (!drop.killed) {
          newDrops.push(drop);
          if (moved && this.options.dropletsRate > 0)
            this.clearDroplets(
              drop.x,
              drop.y,
              drop.r * this.options.dropletsCleaningRadiusMultiplier,
            );
          if (!this.ctx) {
            return;
          }

          this.drawDrop(this.ctx, drop);
        }
      }
    });

    this.drops = newDrops;
  }

  private update(): void {
    this.clearCanvas();

    const now = Date.now();
    if (this.lastRender == null) this.lastRender = now;
    const deltaT = now - this.lastRender;

    let timeScale = deltaT / ((1 / 60) * 1000);

    if (timeScale > 1.1) timeScale = 1.1;
    timeScale *= this.options.globalTimeScale;
    this.lastRender = now;

    this.updateDrops(timeScale);

    requestAnimationFrame(this.update.bind(this));
  }

  public get deltaR(): number {
    return this.options.maxR - this.options.minR;
  }

  public get area(): number {
    return (this.width * this.height) / this.scale;
  }

  public get areaMultiplier(): number {
    return Math.sqrt(this.area / (1024 * 768));
  }
}
