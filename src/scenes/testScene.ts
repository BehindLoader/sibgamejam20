import { AbstractScene } from '../core/scene'
import { Character } from '../core/character';

export class TestScene extends AbstractScene {
  public sprites = {};

  public characters = [
    {
      x: 10,
      y: 10,
    },
  ];

  public player = {
    x: 1,
    y: 2,
  };

  public terrain = [
    {
      x: 5,
      y: 50,
      w: 3,
      h: 2,
    }
  ];
}
