import {
  Image,
  PlatformParticlesImage,
  PlatformImage,
  PlatformPoints,
  PlatformType,
} from './types';

export const DEFAULT_WIDTH = 1280;
export const DEFAULT_HEIGHT = 720;

export const NARROW_SCREEN = 320;
export const MEDIUM_SCREEN = 720;
export const WIDE_SCREEN = 1280;

export const PLATFORM_SPEED = 800;
export const BALL_SPEED = 300;

export const PLATFORMS_COUNT = 24;

export const PLATFORM_HEIGHT = 32;

export const mainSceneName = 'mainScene';

export const platformPoints: PlatformPoints = {
  [PlatformType.Green]: 10,
  [PlatformType.Blue]: 20,
  [PlatformType.Bonus]: 50,
};

export const platformImage: PlatformImage = {
  [PlatformType.Green]: Image.Block1,
  [PlatformType.Blue]: Image.Block2,
  [PlatformType.Bonus]: Image.Bonus,
};

export const platformParticlesImage: PlatformParticlesImage = {
  [PlatformType.Green]: Image.Ball,
  [PlatformType.Blue]: Image.Fire1,
  [PlatformType.Bonus]: Image.Bonus,
};
