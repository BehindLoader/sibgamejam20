/**
 * Parent class for all scenes
 * @abstract
 */
export abstract class AbstractScene {
  sprites: {
    [key: string]: {
      image: string;
      frames: {
        x: number;
        y: number;
        w: number;
        h: number;
      }[];
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

  public abstract step(): void

  public abstract willMount(): void

  public abstract didMount(): void
}
