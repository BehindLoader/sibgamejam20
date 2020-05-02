import { AbstractScene } from '../core/scene'

export class TestScene extends AbstractScene {
  public sprites = {
    test: {
      image: '/src/sprites/test.png',
      x: 1,
      y: 1,
      w: 100,
      h: 50,
    }
  };

  public characters = [
    {
      x: 10,
      y: 10,
      sprite: {
        stand: 'test',
      },
    },
  ];

  public player = {
    x: 1,
    y: 2,
    sprite: {
      stand: 'test',
      move: 'test',
    },
  };

  public terrain = [
    {
      x: 5,
      y: 50,
      w: 5,
      h: 2,
      sprite: 'test',
    }
  ];
}
