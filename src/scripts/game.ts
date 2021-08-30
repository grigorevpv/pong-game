import * as Phaser from 'phaser';
import 'phaser/plugins/spine/dist/SpinePlugin';

// eslint-disable-next-line no-unused-vars
// import SpineWebGLPlugin from '../plugins/SpineWebGLPlugin';

import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../const';
import { getWindowSize } from '../utils/screen';
import { MainScene } from './scenes/MainScene';

export function getGameConfig(scenes: Phaser.Scene[]) {
  const { height, width } = getWindowSize();

  return {
    type: Phaser.WEBGL,
    backgroundColor: '#1199DD',
    scale: {
      parent: 'phaser-game',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: width || DEFAULT_WIDTH,
      height: height || DEFAULT_HEIGHT,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 0,
        },
        debug: false,
      },
    },
    plugins: {
      scene: [
        {
          key: 'SpinePlugin',
          plugin: window.SpinePlugin,
          sceneKey: 'spine',
        },
      ],
    },
    scene: [...scenes],
  };
}

window.addEventListener('load', () => {
  const mainScene = new MainScene({ key: 'main' });

  const gameConfig = getGameConfig([mainScene]);
  // eslint-disable-next-line no-new
  new Phaser.Game(gameConfig);
});
