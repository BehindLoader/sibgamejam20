import { AbstractScene } from '../core/scene'

export class TestScene extends AbstractScene {
  public sprites = {
    test: {
      image: '/src/sprites/testScene/test.png',
      x: 1,
      y: 1,
      w: 100,
      h: 50,
    },
    planet: {
      image: './src/sprites/testScene/parallax-space-big-planet.png',
      x: 0,
      y: 0,
      w: 88,
      h: 87,
    },
    minecraft: {
      image: './src/sprites/testScene/minecraft.png',
      x: 0,
      y: 0,
      w: 16,
      h: 16,
    }
  };

  public characters = [
    {
      x: 0,
      y: 0,
      sprite: {
        stand: 'planet',
      },
    },
  ];

  public player = {
    x: 150,
    y: 150,
    sprite: {
      stand: 'test',
      move: 'test',
    },
  };

  public terrain = [
    {
      x: 0,
      y: 0,
      w: 32,
      h: 32,
      sprite: 'minecraft',
    }
  ];

  public step() {}

  public willMount() {
    // for (const _ of Array(15)) {
    //   this.characters.push({
    //     x: Math.random() * 150,
    //     y: Math.random() * 150,
    //     sprite: {
    //       stand: 'test',
    //     },
    //   });
    // }
  }

  public didMount() {}
}
