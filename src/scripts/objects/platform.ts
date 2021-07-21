import { platformsPositionsArr } from "../../consts";
import { getPlatformsPositionsArr } from "../../helpers/objects";
import { createGroupChildren, createStaticGroup } from "../../helpers/scene";
import { Images } from "../../types";
import { getWindowInnerSize } from "../../utils/dom";

export function createPlatforms(scene: Phaser.Scene): Phaser.Physics.Arcade.StaticGroup {
    const platforms = createStaticGroup(scene)
    const [height, width] = getWindowInnerSize();
    const platformsPositions = getPlatformsPositionsArr(600, 800, height, width, platformsPositionsArr);
    createGroupChildren(platforms, Images.Platform, platformsPositions);

    return platforms;
}

