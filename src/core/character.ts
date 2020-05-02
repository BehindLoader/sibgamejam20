import { MOVE_SPEED } from '../settings'
import { Sprite } from './sprites';


abstract class AbstractCharacter {
  x: number;
  y: number;
  standSprite: Sprite;
  moveSprite: Sprite;

  isMove: boolean;

  constructor(x: number, y: number, standSprite: Sprite, moveSprite: Sprite) {
    this.x = x;
    this.y = y;
    this.standSprite = standSprite;
    this.moveSprite = moveSprite;

    this.isMove = false;
  }

  draw(cameraX: number, cameraY: number, ctx: CanvasRenderingContext2D) {
    if (this.isMove) {
      this.moveSprite.draw(
        ctx,
        this.x,
        this.y,
        cameraX,
        cameraY,
      );
    } else {
      this.standSprite.draw(
        ctx,
        this.x,
        this.y,
        cameraX,
        cameraY,
      );
    }
  }
}

export class Character extends AbstractCharacter {}

export class Player extends AbstractCharacter {
  keysPreferences: {
    [key: number]: {
      pressed: boolean;
      callback: () => void;
    }
  };

  constructor(x: number, y: number, standSprite: Sprite, moveSprite: Sprite) {
    super(x, y, standSprite, moveSprite);

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
