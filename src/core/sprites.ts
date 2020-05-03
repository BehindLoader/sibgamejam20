import { DEFAULT_IMAGE_SPEED } from "../settings";

export class Sprite {
  image: HTMLImageElement;
  frames: {
    x: number;
    y: number;
    w: number;
    h: number;
  }[];
  image_speed: number;
  image_index: number;
  image_counter: number;

  constructor(image: string, frames: { x: number, y: number, w: number, h: number }[], image_speed?: number) {
    this.frames = frames;

    this.image_speed = image_speed || DEFAULT_IMAGE_SPEED;
    this.image_index = 0;
    this.image_counter = 0;

    this.image = new Image();
    this.image.src = image;
  }

  private updateFrame() {
    this.image_counter += 1;

    if (this.image_counter >= this.image_speed) {
      this.image_counter = 0;
      this.image_index += 1;

      if (this.image_index >= this.frames.length) {
        this.image_index = 0;
      }
    }
  }

  getFrame() {
    return this.frames[this.image_index];
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number, cx: number, cy: number) {
    const spriteXPosition = x - cx;
    const spriteYPosition = y - cy;

    const leftVisible = spriteXPosition + this.getFrame().w > 0;
    const rightVisible = spriteXPosition < window.innerWidth;
    const topVisible = spriteYPosition + this.getFrame().h > 0;
    const bottomVisible = spriteYPosition < window.innerHeight;

    if (leftVisible && rightVisible && topVisible && bottomVisible) {
      this.updateFrame();

      ctx.drawImage(
        this.image,
        this.getFrame().x,
        this.getFrame().y,
        this.getFrame().w,
        this.getFrame().h,
        spriteXPosition,
        spriteYPosition,
        this.getFrame().w,
        this.getFrame().h,
      )
    }
  }
}
