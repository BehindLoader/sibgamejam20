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

  blocked: {
    right?: boolean;
    left?: boolean;
    up?: boolean;
    down?: boolean;
  }

  constructor(x: number, y: number, standSprite: Sprite, moveSprite: Sprite) {
    super(x, y, standSprite, moveSprite);

    this.blocked = {}

    this.keysPreferences = {
      68: {
        pressed: false,
        callback: () => { this.x += this.blocked.right ? 0 : MOVE_SPEED; },
      },
      65: {
        pressed: false,
        callback: () => { this.x -= this.blocked.left ? 0 : MOVE_SPEED; },
      },
      83: {
        pressed: false,
        callback: () => { this.y += this.blocked.down ? 0 : MOVE_SPEED; }
      },
      87: {
        pressed: false,
        callback: () => { this.y -= this.blocked.up ? 0 : MOVE_SPEED; }
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

  public checkCollision(x: number, y: number, w: number, h: number) {
    // debugger
    this.blocked.right = this.contains({
      x: this.x + MOVE_SPEED,
      y: this.y,
      w: this.standSprite.w,
      h: this.standSprite.h,
    }, { x, y, w, h })
    this.blocked.left = this.contains({
      x: this.x - MOVE_SPEED,
      y: this.y,
      w: this.standSprite.w,
      h: this.standSprite.h,
    }, { x, y, w, h })
    this.blocked.up = this.contains({
      x: this.x,
      y: this.y - MOVE_SPEED,
      w: this.standSprite.w,
      h: this.standSprite.h,
    }, { x, y, w, h })
    this.blocked.down = this.contains({
      x: this.x,
      y: this.y + MOVE_SPEED,
      w: this.standSprite.w,
      h: this.standSprite.h,
    }, { x, y, w, h })
  }

  private contains(
    player: {
      x: number;
      y: number;
      w: number;
      h: number;
    },
    other: {
      x: number;
      y: number;
      w: number;
      h: number;
    }
  ): boolean {
    return (
      player.x + player.w > other.x &&
      player.x < other.x + other.w &&
      player.y + player.h > other.y &&
      player.y < other.y + other.h
    )
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
