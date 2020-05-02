export class Sprite {
  image: HTMLImageElement;
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(image: string, x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = new Image();
    this.image.src = image;
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number, cx: number, cy: number) {
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.w,
      this.h,
      x,
      y,
      this.w,
      this.h,
    )
  }
}
