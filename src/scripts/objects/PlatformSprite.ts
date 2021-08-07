import * as Phaser from 'phaser';
import { getPlatformPosition } from '../../helpers/platform';

export class PlatformSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    this.setTexture(texture);
    this.setPosition(x, y);

    scene.add.existing(this);
    scene.physics.world.enable(this);
  }

  public onResize() {
    const { x, y } = getPlatformPosition();

    this.setPosition(x, y);
  }
}
