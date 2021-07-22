import { setMaxScore } from "../scripts/objects/scoreText";
import { Coordinate } from "../types";
import { LocalStorage } from "../utils/localStorage"

export function getScoreText(text: string, value: number) {
    return `${text}: ${value}`
}

export function getLSItem(ls: LocalStorage, key: string): string | null {
    return ls.getItem(key)
}

export function increaseScore(scoreText: Phaser.GameObjects.Text, maxScore: number) {
    let currentScore = 0;

    return function(points: number) {
        currentScore += points

        setMaxScore(maxScore, currentScore)
        scoreText.setText(getScoreText("Score", currentScore))
    }
}

export function getMaxScoreTextPosition(
    screenWidth: number,
    screenWidthBreakpoint: number,
    indentX: number,
    indentY: number,
    textWidth: number,
    textHeight: number
): Coordinate {
    if(screenWidth < screenWidthBreakpoint) {
        return {
            x: indentX,
            y: indentY + textHeight
        }
    }

    return {
        x: screenWidth - textWidth,
        y: indentY
    }
}