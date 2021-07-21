import { GroupItemPosition } from "../types";

export function getPlatformsPositionsArr(
    defaultHeight: number,
    defaultWidth: number,
    screenHeight: number,
    screenWidth: number,
    positionsArr: GroupItemPosition[]
): GroupItemPosition[] {
    const xCoef = screenWidth / defaultWidth;
    const yCoef = screenHeight / defaultHeight;

    return positionsArr.map((position) => ({
        x: position.x * xCoef,
        y: position.y * yCoef,
        scale: position.scale ? position.scale * xCoef : undefined,
    }))
}