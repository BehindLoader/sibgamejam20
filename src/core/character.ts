abstract class AbstractCharacter {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'pink';
    ctx.fillRect(
      this.x,
      this.y,
      100,
      100,
    );
  }
}


export class Character extends AbstractCharacter {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    super(x, y);
  }
}

export class Player extends AbstractCharacter {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    super(x, y);
  }
}
