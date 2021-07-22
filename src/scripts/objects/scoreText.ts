import { GAME_SCORE_KEY } from "../../consts"
import { getMaxScoreTextPosition, getScoreText } from "../../helpers/score"
import { getWindowInnerSize } from "../../utils/dom"

const textIndentX = 16
const textIndentY = 16
const screenWidthBreakPoint = 768
const maxScoreTextWidth = 312
const maxScoreTextHeight = 50

const scoreText = "Score"
const maxScoreText = "Max Score"

export function createScoreText(scene: Phaser.Scene): Phaser.GameObjects.Text {
    const text = getScoreText(scoreText, 0);
    return scene.add.text(textIndentX, textIndentY, text, { fontSize: '32px' })
}

export function createMaxScoreText(scene: Phaser.Scene): Phaser.GameObjects.Text {
    const maxScore = Number(localStorage.getItem(GAME_SCORE_KEY))
    const text = getScoreText(maxScoreText, maxScore)
    const [height, width] = getWindowInnerSize();
    const maxScoreCoordinate = getMaxScoreTextPosition(width, screenWidthBreakPoint, textIndentX, textIndentY, maxScoreTextWidth, maxScoreTextHeight)

    return scene.add.text(maxScoreCoordinate.x, maxScoreCoordinate.y, text, { fontSize: '32px' })
}

export function setMaxScore(maxScore: number, currentScore: number) {
    if (currentScore > maxScore) {
        localStorage.setItem(GAME_SCORE_KEY, currentScore.toFixed())
    }
}