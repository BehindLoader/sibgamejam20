import { MOVE_SPEED } from '../settings'


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

  keysPreferences: {
    [key: number]: {
      pressed: boolean;
      callback: () => void;
    }
  };

  constructor(x: number, y: number) {
    super(x, y);

    this.keysPreferences = {
      68: {
        pressed: false,
        callback: () => { this.x += MOVE_SPEED; },
      },
      65: {
        pressed: false,
        callback: () => { this.x -= MOVE_SPEED; },
      },
      83: {
        pressed: false,
        callback: () => { this.y += MOVE_SPEED; }
      },
      87: {
        pressed: false,
        callback: () => { this.y -= MOVE_SPEED; }
      },
    }

    document.addEventListener(
      'keydown',
      (e: KeyboardEvent) => this.keyDown(e),
    );
    document.addEventListener(
      'keyup',
      (e: KeyboardEvent) => this.keyUp(e),
    );
  }

  public step() {
    Object.values(this.keysPreferences).filter(item => {
      return item.pressed
    }).forEach(item => {
      item.callback();
    })
  }

  private keyDown(e: KeyboardEvent) {
    const keyboardObject = this.keysPreferences[e.keyCode];
    if (keyboardObject) {
      keyboardObject.pressed = true;
    }
  }

  private keyUp(e: KeyboardEvent) {
    const keyboardObject = this.keysPreferences[e.keyCode];
    if (keyboardObject) {
      keyboardObject.pressed = false;
    }
  }
}
