import { GroupItemPosition } from "../types"
import { getRandomNumber } from "../utils/number"

export function generateGroupItemsPositions(count: number, maxX: number, maxY: number): GroupItemPosition[] {
    const starPositions: GroupItemPosition[] = []

    for (let i = 0; i < count; i++) {
        starPositions.push({
            x: Math.floor(getRandomNumber(0, maxX)),
            y: Math.floor(getRandomNumber(0, maxY))
        })
    }

    return starPositions
}

export function clearIntervals(intervalsIds: Array<number | null>): void {
    intervalsIds.forEach((intervalId) => {
        if (intervalId) {
            clearInterval(intervalId)
        }
    })
}