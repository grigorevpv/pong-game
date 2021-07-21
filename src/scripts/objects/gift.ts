import { GIFTS_GENERATE_COUNT, GIFTS_GENERATE_DELAY, GIFT_POINTS } from "../../consts";
import { generateGroupItemsPositions } from "../../helpers/group";
import { createGroupChildren, createGroup, clearGroupChildren } from "../../helpers/scene";
import { getScoreText } from "../../helpers/score";
import { Images } from "../../types";
import { getWindowInnerSize } from "../../utils/dom";
import { setMaxScore } from "./scoreText";

export let giftsGeneratorTimerId: number | null = null;

export function createGifts(scene: Phaser.Scene): Phaser.Physics.Arcade.Group {
    const gifts = createGroup(scene, { bounceY: 0.5, bounceX: 0.5, collideWorldBounds: true });

    giftsGenerator(gifts, GIFTS_GENERATE_COUNT, GIFTS_GENERATE_DELAY);

    return gifts;
}

function giftsGenerator(starsGroup: Phaser.Physics.Arcade.Group, starsCount: number, delay: number) {
    giftsGeneratorTimerId = window.setInterval(() => {
        const [height, width] = getWindowInnerSize()
        const giftsPositions = generateGroupItemsPositions(starsCount, width, height)

        createGroupChildren(starsGroup, Images.Gift, giftsPositions)
    }, delay);
}

export function overlapGiftCallback(increaseScore) {
    return function(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, gift:  any) {
        gift.disableBody(true, true)

        increaseScore(GIFT_POINTS)
    }
}