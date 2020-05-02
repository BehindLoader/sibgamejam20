/**
 * Parent class for all scenes
 * @abstract
 */
export abstract class AbstractScene {
  sprites: {
    [key: string]: {
      image: string;
      x: number;
      y: number;
      w: number;
      h: number;
    }
  };

  characters: {
    x: number;
    y: number;
    sprite: {
      move?: string;
      stand: string;
    };
  }[];

  terrain: {
    x: number;
    y: number;
    w: number;
    h: number;
    sprite: string;
  }[];

  player: {
    x: number;
    y: number;
    sprite: {
      move: string;
      stand: string;
    };
  };
}
