import { STARS_GENERATE_COUNT, STARS_GENERATE_DELAY, YELLOW_STAR_POINTS } from "../../consts";
import { generateGroupItemsPositions } from "../../helpers/group";
import { createGroupChildren, createGroup, clearGroupChildren } from "../../helpers/scene";
import { getScoreText } from "../../helpers/score";
import { Images } from "../../types";
import { getWindowInnerSize } from "../../utils/dom";
import { setMaxScore } from "./scoreText";

export let starsGeneratorTimerId: number | null = null;

export function createStars(scene: Phaser.Scene): Phaser.Physics.Arcade.Group {
    const stars = createGroup(scene, { bounceY: 0.5, bounceX: 0.5, collideWorldBounds: true });

    starsGenerator(stars, STARS_GENERATE_COUNT, STARS_GENERATE_DELAY);

    return stars;
}

function starsGenerator(starsGroup: Phaser.Physics.Arcade.Group, starsCount: number, delay: number) {
    starsGeneratorTimerId = window.setInterval(() => {
        const [height, width] = getWindowInnerSize();
        const starsPositions = generateGroupItemsPositions(starsCount, width, height);

        createGroupChildren(starsGroup, Images.Star, starsPositions);
    }, delay);
}

export function overlapStarCallback(increaseScore) {
    return function(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, star:  any) {
        star.disableBody(true, true)

        increaseScore(YELLOW_STAR_POINTS)
    }
}