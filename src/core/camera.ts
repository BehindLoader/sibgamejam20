import { Character, Player } from './character';
import { AbstractScene } from './scene'
import { Terrain } from './terrain';
import { Sprite } from './sprites';

export class Camera {
  sprites: { [key: string]: Sprite };
  characters: Character[];
  player: Player;
  terrain: Terrain[];

  setScene (scene: AbstractScene) {
    this.sprites = Object.keys(scene.sprites).reduce((acc, key) => {
      acc[key] = new Sprite();
      // scene.sprites
      return acc
    }, {})

    for (const spriteName in scene.sprites) {
      this.sprites[spriteName] = new Sprite();
    }

    this.characters = scene.characters.map(item => {
      return new Character(
        item.x,
        item.y,
      );
    });

    this.player = new Player(
      scene.player.x,
      scene.player.y,
    );

    this.terrain = scene.terrain.map(item => {
      return new Terrain(
        item.x,
        item.y,
        item.w,
        item.h,
      );
    })
  }

  render (ctx: CanvasRenderingContext2D) {
    for (const character of this.characters) {
      character.draw(ctx);
    }

    for (const terrain of this.terrain) {
      terrain.draw(ctx);
    }

    this.player.step();
    this.player.draw(ctx);
  }
}
