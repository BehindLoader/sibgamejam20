import { Character, Player } from "./character";
import { Terrain } from "./terrain";

/**
 * Parent class for all scenes
 * @abstract
 */
export abstract class AbstractScene {
  sprites: {
    [key: string]: {}
  };

  characters: {
    x: number;
    y: number;
  }[];

  terrain: {
    x: number;
    y: number;
    w: number;
    h: number;
  }[];

  player: {
    x: number;
    y: number;
  };
}
