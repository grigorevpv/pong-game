export function getRandomNumber(min = 0, max = 10): number {
    return Math.random() * (max - min) + min;
}