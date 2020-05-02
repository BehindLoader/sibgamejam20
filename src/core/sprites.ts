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
    const spriteXPosition = x - cx;
    const spriteYPosition = y - cy;

    const leftVisible = spriteXPosition + this.w > 0;
    const rightVisible = spriteXPosition < window.innerWidth;
    const topVisible = spriteYPosition + this.h > 0;
    const bottomVisible = spriteYPosition < window.innerHeight;

    if (leftVisible && rightVisible && topVisible && bottomVisible) {
      ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.w,
        this.h,
        spriteXPosition,
        spriteYPosition,
        this.w,
        this.h,
      )
    }
  }
}
