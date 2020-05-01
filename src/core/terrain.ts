export class Terrain {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let h = 0; h < this.h; h++) {
      for (let w = 0; w < this.w; w++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x + 100 * w, this.y + 10 * h, 100, 10);
      }
    }
  }
}
