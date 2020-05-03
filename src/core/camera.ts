import { Character, Player } from './character';
import { AbstractScene } from './scene'
import { Terrain } from './terrain';
import { Sprite } from './sprites';
import globals from './globals';

export class Camera {
  scene: AbstractScene;

  sprites: { [key: string]: Sprite };
  characters: Character[];
  player: Player;
  terrain: Terrain[];

  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }

  setScene (scene: AbstractScene) {
    this.scene = scene;
    this.scene.willMount();

    this.sprites = Object.keys(scene.sprites).reduce((acc, key) => {
      const sprite = scene.sprites[key];
      acc[key] = new Sprite(
        sprite.image,
        sprite.frames,
      );
      return acc
    }, {})

    this.characters = scene.characters.map(item => {
      return new Character(
        item.x,
        item.y,
        this.sprites[item.sprite.stand],
        this.sprites[item.sprite.move],
      );
    });

    this.player = new Player(
      scene.player.x,
      scene.player.y,
      this.sprites[scene.player.sprite.stand],
      this.sprites[scene.player.sprite.move],
    );

    this.terrain = scene.terrain.map(item => {
      return new Terrain(
        item.x,
        item.y,
        item.w,
        item.h,
        this.sprites[item.sprite],
      );
    });

    this.scene.didMount();
  }

  render (ctx: CanvasRenderingContext2D) {
    for (const terrain of this.terrain) {
      terrain.draw(this.x, this.y, ctx);
    }
    this.scene.step();

    this.player.blocked = {}
    delete this.player.nearestObject
    for (const character of this.characters) {
      this.player.checkCollision(
        character.x,
        character.y,
        character.standSprite.getFrame().w,
        character.standSprite.getFrame().h,
      )
      this.player.setInteractive(character);
      character.draw(this.x, this.y, ctx);
    }

    if (globals.PAUSED) {
      if (this.player.dialog) {
        this.player.dialog.draw(ctx);
      }
    } else {
      this.player.step();
      this.x = this.player.x - window.innerWidth / 2;
      this.y = this.player.y - window.innerHeight / 2;
      this.player.draw(this.x, this.y, ctx);
    }
  }
}
