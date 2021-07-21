import { getWidthScale } from "../../helpers/scale";
import { getScoreText } from "../../helpers/score"
import { getWindowInnerSize } from "../../utils/dom";

export function createScoreText(scene: Phaser.Scene): Phaser.GameObjects.Text {
    const text = getScoreText("Score", 0);
    return scene.add.text(16, 16, text, { fontSize: '32px' })
}

export function createMaxScoreText(scene: Phaser.Scene): Phaser.GameObjects.Text {
    const maxScore = Number(localStorage.getItem("game-score"))
    const text = getScoreText("MAX Score", maxScore);
    const [height, width] = getWindowInnerSize();

    return scene.add.text(width - 312, 16, text, { fontSize: '32px' })
}

export function setMaxScore(maxScore: number, currentScore: number) {
    if (currentScore > maxScore) {
        localStorage.setItem("game-score", currentScore.toFixed())
    }
}