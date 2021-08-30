import * as Phaser from 'phaser';

export class BlockSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    id?: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);

    this.setTexture(texture);
    this.setPosition(x, y);

    scene.add.existing(this);
    scene.physics.world.enable(this);

    if (id) {
      this.setData({ id });
    }
  }

  public onCollider() {
    const velocityX = Math.floor(Math.random() * 50);
    const velocityY = Math.floor(Math.random() * 200 - 100);

    this.body.gravity.y = 300;
    this.setVelocityY(velocityX);
    this.setVelocityY(velocityY);
  }
}
