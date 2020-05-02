import { Sprite } from "./sprites";

export class Terrain {
  x: number;
  y: number;
  xRepeat: number;
  yRepeat: number;
  sprite: Sprite;

  constructor(x: number, y: number, xRepeat: number, yRepeat: number, sprite: Sprite) {
    this.x = x;
    this.y = y;
    this.xRepeat = xRepeat;
    this.yRepeat = yRepeat;
    this.sprite = sprite;
  }

  draw(cameraX: number, cameraY: number, ctx: CanvasRenderingContext2D) {
    for (let h = 0; h < this.yRepeat; h++) {
      for (let w = 0; w < this.xRepeat; w++) {
        this.sprite.draw(
          ctx,
          this.x + this.sprite.w * w,
          this.y + this.sprite.h * h,
          cameraX,
          cameraY,
        );
      }
    }
  }
}
