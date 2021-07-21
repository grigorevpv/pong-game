import { setMaxScore } from "../scripts/objects/scoreText";
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