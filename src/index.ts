import { Main } from './core/main';
import { TestScene } from './scenes/testScene';

// Init
const main = new Main();
const testScene = new TestScene();
main.camera.setScene(testScene);
main.runRender();
