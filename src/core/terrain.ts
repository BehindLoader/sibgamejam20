import { Sprite } from "./sprites";

export class Terrain {
  x: number;
  y: number;
  w: number;
  h: number;
  sprite: Sprite;

  constructor(x: number, y: number, w: number, h: number, sprite: Sprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
  }

  draw(cameraX: number, cameraY: number, ctx: CanvasRenderingContext2D) {
    for (let h = 0; h < this.h; h++) {
      for (let w = 0; w < this.w; w++) {
        this.sprite.draw(
          ctx,
          this.x + this.w * w,
          this.y + this.h * h,
          cameraX,
          cameraY,
        );
      }
    }
  }
}
