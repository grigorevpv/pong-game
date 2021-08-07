/* eslint-disable no-unused-vars */
import * as Phaser from 'phaser';
import { getBlocksScale } from '../../helpers/blocks';
import { PlatformType } from '../../types';
import { getWindowSize } from '../../utils/screen';

export class BlockTileSprite extends Phaser.GameObjects.TileSprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string,
    public blockType: PlatformType,
    public points: number,
    public index = 0,
  ) {
    super(scene, x, y, width, height, texture);

    this.setBlockData();
    this.scaleBlock();

    scene.add.existing(this);
  }

  private setBlockData() {
    this.setData({
      type: this.blockType,
      points: this.points,
      index: this.index,
    });
  }

  private scaleBlock() {
    const { width } = getWindowSize();
    const platformsScale = getBlocksScale(width);
    this.scale = platformsScale;
  }

  public onResize(x: number, y: number) {
    this.setPosition(x, y);
  }
}
