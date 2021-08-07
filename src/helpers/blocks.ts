import * as Phaser from 'phaser';

import {
  NARROW_SCREEN,
  MEDIUM_SCREEN,
  platformPoints,
  platformImage,
  platformParticlesImage,
  WIDE_SCREEN,
} from '../const';
import { BlockTileSprite } from '../scripts/objects/BlockSprite';
import { MainScene } from '../scripts/scenes/MainScene';
import {
  ItemSize,
  PlatformData,
  PlatformType,
} from '../types';
import { getWindowSize } from '../utils/screen';

const PLATFORM_HEIGHT = 32;
const NARROW_PLATFORM_WIDTH = 68;
const MEDIUM_PLATFORM_WIDTH = 68;
const WIDE_PLATFORM_WIDTH = 136;

export function getPlatformSize(width: number): ItemSize {
  let platformWidth = WIDE_PLATFORM_WIDTH;

  if (width < NARROW_SCREEN) {
    platformWidth = NARROW_PLATFORM_WIDTH;
  }

  if (width < MEDIUM_SCREEN) {
    platformWidth = MEDIUM_PLATFORM_WIDTH;
  }

  return {
    height: PLATFORM_HEIGHT,
    width: platformWidth,
  };
}

export function getBlocksScale(width: number) {
  let ratio = 1;

  if (width <= MEDIUM_SCREEN) {
    ratio = 0.8;
  }

  if (width <= NARROW_SCREEN) {
    ratio = 0.6;
  }

  return ratio;
}

export function getPlatformsCoordinates(width: number, height: number): Array<[number, number]> {
  let rowCount = 3;
  let colCount = 8;

  if (width < WIDE_SCREEN) {
    rowCount = 6;
    colCount = 4;
  }

  const { height: platformHeight, width: platformWidth } = getPlatformSize(width);
  const freeWidthSpace = width - colCount * platformWidth;
  const freeWidthSpaceBetweenBlocks = freeWidthSpace / (colCount + 1);
  const widthCenterFirstBlock = freeWidthSpaceBetweenBlocks + platformWidth / 2;
  const widthSpaceBetweenBlocks = platformWidth + freeWidthSpaceBetweenBlocks;

  const rowStep = (height - platformHeight) / (2 * rowCount);
  const res: Array<[number, number]> = [];

  for (let i = 1; i <= rowCount; i += 1) {
    for (let j = 0; j < colCount; j += 1) {
      res.push([
        height / 2 - (rowStep * i - platformHeight),
        widthCenterFirstBlock + j * widthSpaceBetweenBlocks,
      ]);
    }
  }

  return res;
}

export const collideEmitterConfig = {
  x: 400,
  y: 300,
  speed: 200,
  blendMode: 'ADD',
  scale: { start: 0.25, end: 0 },
  on: false,
};

export function getPlatformType(index: number): PlatformType {
  return index % 2 ? PlatformType.Green : PlatformType.Blue;
}

export function getPlatformData(platformType: PlatformType): PlatformData {
  return {
    type: platformType,
    image: platformImage[platformType],
    points: platformPoints[platformType],
    particlesImage: platformParticlesImage[platformType],
  };
}

export function createBlocksItems(platform: Phaser.Physics.Arcade.StaticGroup, scene: MainScene) {
  const { width, height } = getWindowSize();
  const platformCoords = getPlatformsCoordinates(width, height);
  const { height: platformHeight, width: platformWidth } = getPlatformSize(width);

  platformCoords.forEach((platformCoord, index) => {
    let type = getPlatformType(index);

    if (index === 3) {
      type = PlatformType.Bonus;
    }

    const { image, points } = getPlatformData(type);
    const platformSprite = new BlockTileSprite(
      scene, platformCoord[1], platformCoord[0], platformWidth,
      platformHeight, image, type, points, index,
    );

    platform.add(platformSprite);
  });
}

export function onResizeBlocksEffect(blocks: Phaser.Physics.Arcade.StaticGroup) {
  const { width, height } = getWindowSize();
  const platformCoords = getPlatformsCoordinates(width, height);

  blocks.getChildren().forEach((block) => {
    const blockIndex = block.getData('index');
    const blockCoordinates = platformCoords[blockIndex] || [0, 0];

    (block as BlockTileSprite).onResize(blockCoordinates[1], blockCoordinates[0]);
  });
}
