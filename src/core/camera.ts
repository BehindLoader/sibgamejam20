import { Character, Player } from './character';
import { AbstractScene } from './scene'
import { Terrain } from './terrain';
import { Sprite } from './sprites';

export class Camera {
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
    this.sprites = Object.keys(scene.sprites).reduce((acc, key) => {
      const sprite = scene.sprites[key];
      acc[key] = new Sprite(
        sprite.image,
        sprite.x,
        sprite.y,
        sprite.w,
        sprite.h,
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
    })
  }

  render (ctx: CanvasRenderingContext2D) {
    this.x = this.player.x + (window.innerWidth / 2);
    this.y = this.player.y + (window.innerHeight / 2);

    for (const character of this.characters) {
      character.draw(this.x, this.y, ctx);
    }

    for (const terrain of this.terrain) {
      terrain.draw(this.x, this.y, ctx);
    }

    this.player.step();
    this.player.draw(this.x, this.y, ctx);
  }
}
