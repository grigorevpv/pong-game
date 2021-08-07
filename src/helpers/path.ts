import * as Phaser from 'phaser';
import { Image } from '../types';

export function getImagePath(name: Image) {
  return `assets/img/${name}.png`;
}

export function getImages(): Phaser.Types.Loader.FileTypes.ImageFileConfig[] {
  return Object.values(Image).map((imgName) => ({
    key: imgName,
    url: getImagePath(imgName),
  }));
}

export function getJsonPath(name: Image) {
  return `assets/json/${name}.json`;
}
