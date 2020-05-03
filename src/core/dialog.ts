import globals from './globals';

export class DialogWindow {
  text: string;

  constructor(text: string) {
    this.text = text;

    this.open();
  }

  open() {
    globals.PAUSED = true;
  }

  close() {
    globals.PAUSED = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = 0;
    const y = window.innerHeight - window.innerHeight / 3;
    const w = window.innerWidth;
    const h = window.innerHeight - y;
    ctx.fillStyle = 'pink';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'black';
    ctx.font = 'Bold 64px Courier'
    ctx.fillText(
      this.text,
      x,
      y + window.innerHeight / 6,
      w
    );
  }
}
