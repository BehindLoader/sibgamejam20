import { MOVE_SPEED } from '../settings'
import { Sprite } from './sprites';
import globals from './globals';
import { DialogWindow } from './dialog';


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

export class Character extends AbstractCharacter {
  constructor(x: number, y: number, standSprite: Sprite, moveSprite: Sprite) {
    super(x, y, standSprite, moveSprite);
  }

  interrupt() {
    return new DialogWindow('HI!');
  }
}

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

  nearestObject?: {
    distance: number;
    character: Character;
  };

  dialog: DialogWindow;

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
      69: {
        pressed: false,
        callback: () => {
          if (this.nearestObject?.distance < MOVE_SPEED * 25) {
            this.dialog = this.nearestObject.character.interrupt();
            this.keysPreferences[69].pressed = false;
          }
        }
      }
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
    this.blocked.right = this.blocked.right ? this.blocked.right : this.contains({
      x: this.x + MOVE_SPEED,
      y: this.y,
      w: this.standSprite.getFrame().w,
      h: this.standSprite.getFrame().h,
    }, { x, y, w, h })
    this.blocked.left = this.blocked.left ? this.blocked.left : this.contains({
      x: this.x - MOVE_SPEED,
      y: this.y,
      w: this.standSprite.getFrame().w,
      h: this.standSprite.getFrame().h,
    }, { x, y, w, h })
    this.blocked.up = this.blocked.up ? this.blocked.up : this.contains({
      x: this.x,
      y: this.y - MOVE_SPEED,
      w: this.standSprite.getFrame().w,
      h: this.standSprite.getFrame().h,
    }, { x, y, w, h })
    this.blocked.down = this.blocked.down ? this.blocked.down : this.contains({
      x: this.x,
      y: this.y + MOVE_SPEED,
      w: this.standSprite.getFrame().w,
      h: this.standSprite.getFrame().h,
    }, { x, y, w, h })
  }

  public setInteractive(character: Character) {
    const playerX = this.x + this.standSprite.getFrame().w / 2;
    const playerY = this.y + this.standSprite.getFrame().h / 2;
    const otherX = character.x + character.standSprite.getFrame().w / 2;
    const otherY = character.y + character.standSprite.getFrame().h / 2;

    const width = Math.abs(playerX - otherX);
    const height = Math.abs(playerY - otherY);

    const distance = Math.sqrt(width ** 2 + height ** 2);

    const nearestDistance = this.nearestObject?.distance || Infinity;

    if (distance < nearestDistance) {
      this.nearestObject = { distance, character }
    }
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
      player.x < other.x + other.w &&
      player.x + player.w > other.x &&
      player.y + player.h > other.y &&
      player.y < other.y + player.h
    )
  }

  public step() {
    Object.values(this.keysPreferences).filter(item => {
      return item.pressed
    }).forEach(item => {
      item.callback();
    });
  }

  private keyDown(e: KeyboardEvent) {
    const keyboardObject = this.keysPreferences[e.keyCode];
    if (keyboardObject) {
      if (this.dialog) {
        this.dialog.close();
        delete this.dialog;
      }

      this.isMove = true;
      keyboardObject.pressed = true;
    }
  }

  private keyUp(e: KeyboardEvent) {
    const keyboardObject = this.keysPreferences[e.keyCode];
    if (keyboardObject) {
      this.isMove = false;
      keyboardObject.pressed = false;
    }
  }
}
