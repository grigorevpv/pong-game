import { platformsPositionsArr } from "../../consts";
import { getPlatformsPositionsArr, preparePlatformPositionsScales } from "../../helpers/objects";
import { createGroupChildren, createStaticGroup } from "../../helpers/scene";
import { Images } from "../../types";
import { getWindowInnerSize } from "../../utils/dom";

export function createPlatforms(scene: Phaser.Scene): Phaser.Physics.Arcade.StaticGroup {
    const platforms = createStaticGroup(scene)
    const [height, width] = getWindowInnerSize();
    let platformsPositions = preparePlatformPositionsScales(platformsPositionsArr, 200, width);
    platformsPositions = getPlatformsPositionsArr(600, 800, height, width, platformsPositions);
    createGroupChildren(platforms, Images.Platform, platformsPositions);

    return platforms;
}

