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

export function preparePlatformPositionsScales(
    positionsArr: GroupItemPosition[],
    platformWidth: number,
    screenWidth: number
): GroupItemPosition[] {
    let scaleCoef = 0;

    if (platformWidth > (0.3 * screenWidth)) {
        scaleCoef = (0.3 * screenWidth) / platformWidth;
    }

    return positionsArr.map((position) => ({
        x: position.x,
        y: position.y,
        scale: position.scale ? position.scale : scaleCoef,
    }))
}