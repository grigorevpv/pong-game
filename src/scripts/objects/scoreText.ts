import * as Phaser from 'phaser';

export class ScoreText extends Phaser.GameObjects.Text {
  private score: number;

  private scoreText = 'Score:';

  constructor(
    scene: Phaser.Scene, x: number, y: number,
    text: string, style: Phaser.Types.GameObjects.Text.TextStyle,
  ) {
    super(scene, x, y, text, style);

    this.score = 0;

    this.setText(this.getScoreText());
    scene.add.existing(this);
  }

  public increaseScore(points: number) {
    this.score += points;
    this.setText(this.getScoreText());
  }

  private getScoreText() {
    return `${this.scoreText} ${this.score}`;
  }
}
