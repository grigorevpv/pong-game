import { ItemPosition } from '../types';
import { getWindowSize } from '../utils/screen';

export function getPlatformPosition(platformWidth = 0): ItemPosition {
  const { width, height } = getWindowSize();

  return {
    x: width / 2 - platformWidth / 2,
    y: height - 40,
  };
}
