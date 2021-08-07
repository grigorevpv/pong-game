import * as Phaser from 'phaser';

export class BallSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    this.setTexture(texture);
    this.setPosition(x, y);

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setBounce(1);
    (this.body as Phaser.Physics.Arcade.Body)
      .setCollideWorldBounds(true, undefined, undefined, true);
  }
}
