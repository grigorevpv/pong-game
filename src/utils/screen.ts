import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../const';
import { WindowSize } from '../types';

export function getWindowSize(): WindowSize {
  let height = DEFAULT_HEIGHT;
  let width = DEFAULT_WIDTH;

  if (window && window.innerHeight && window.innerWidth) {
    height = window.innerHeight;
    width = window.innerWidth;
  }

  return {
    height,
    width,
  };
}
