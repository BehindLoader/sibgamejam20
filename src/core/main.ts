import { Camera } from './camera'

/**
 * Main Canvas class.
 */
export class Main {
  _canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  camera: Camera;

  renderInterval: NodeJS.Timeout;

  constructor () {
    this._canvas = <HTMLCanvasElement>document.getElementById('app')
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    this.ctx = this._canvas.getContext('2d')

    this.ctx.imageSmoothingEnabled = false

    this.camera = new Camera()
  }

  runRender () {
    this.renderInterval = setInterval(() => this.render(), 0)
  }

  stopRender () {
    clearInterval(this.renderInterval)
  }

  render () {
    this.ctx.clearRect(
      0,
      0,
      this._canvas.width,
      this._canvas.height
    );
    this.camera.render(this.ctx);
  }
}
