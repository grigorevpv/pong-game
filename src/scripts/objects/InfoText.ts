import * as Phaser from 'phaser';

const GAMEOVER_TEXT = 'Game over, press SPACE to restart';

const PAUSE_TEXT = 'Game paused, press SPACE to continue';

export class InfoText extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene, x: number, y: number,
    text: string, style: Phaser.Types.GameObjects.Text.TextStyle,
  ) {
    super(scene, x, y, text, style);

    this.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
    this.setVisible(false);

    scene.add.existing(this);
  }

  public showPauseText() {
    this.setText(PAUSE_TEXT);
    this.setVisible(true);
  }

  public showGameoverText() {
    this.setText(GAMEOVER_TEXT);
    this.setVisible(true);
  }

  public hideInfoText() {
    this.setVisible(false);
  }
}
