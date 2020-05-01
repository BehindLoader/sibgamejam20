import { Camera } from './camera';

/**
 * Main Canvas class.
 */
export class Main {
  _canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this._canvas = <HTMLCanvasElement>document.getElementById('app');
    this.ctx = this._canvas.getContext('2d');

    this.ctx.imageSmoothingEnabled = false;

    setInterval(() => this.render(), 0);
  }

  render() {
    // Global render step
  }
}
