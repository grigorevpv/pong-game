import { DEFAULT_FRAME_HEIGHT, DEFAULT_FRAME_WIDTH } from "../consts";
import { Asserts, SceneImage, SceneSpriteSheet, Images, SpriteSheets } from "../types";

export function getAssertPath(name: Asserts): string {
    return `assets/img/${name}.png`;
}

export function getSceneImages(images: Images[]): SceneImage[] {
    return images.map((name: Images) => ({
        name: name,
        src: getAssertPath(name)
    }))
}

export function getSceneSpriteSheets(spriteSheets: SpriteSheets[]): SceneSpriteSheet[] {
    return spriteSheets.map((name: SpriteSheets) => ({
        name: name,
        src: getAssertPath(name),
        frameSize: {
            frameWidth: DEFAULT_FRAME_WIDTH,
            frameHeight: DEFAULT_FRAME_HEIGHT,
        }
    }))
}
