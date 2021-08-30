/* eslint-disable no-unused-vars */
import * as Phaser from 'phaser';
import { getBlockGroupItemId, getPlatformData } from '../../helpers/blocks';
import { PlatformType } from '../../types';
import { PLATFORM_HEIGHT } from '../../const';
import { BlockSprite } from './BlockSprite';

export class BlocksGroup extends Phaser.Physics.Arcade.StaticGroup {
  public constructor(
    scene: Phaser.Scene,
    world: Phaser.Physics.Arcade.World,
    private xCoordinate: number,
    private yCoordinate: number,
    private blockType: PlatformType,
    private index: number,
  ) {
    super(world, scene);
    this.createBlockItems();
  }

  private createBlockItems() {
    for (let i = 0; i < 4; i += 1) {
      const { image } = getPlatformData(this.blockType);
      const xCoordinate = this.xCoordinate - (i - 2) * PLATFORM_HEIGHT;
      const platformSprite = new BlockSprite(
        this.scene, xCoordinate, this.yCoordinate, image, getBlockGroupItemId(this.index, i),
      );
      platformSprite.body.immovable = true;

      this.add(platformSprite);
    }
  }
}
