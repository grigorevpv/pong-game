export function getImageScale(
    imgHeight: number,
    imgWidth: number,
    screenHeight: number,
    screenWidth: number
): number {
    return Math.max(screenHeight/imgHeight, screenWidth/imgWidth);
}

export function getWidthScale(imgWidth: number, screenWidth: number) {
    return screenWidth / imgWidth;
}