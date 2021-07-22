import { BALLS_DESTROY_DELAY, BALLS_GENERATE_COUNT, BALLS_GENERATE_DELAY, GROUND_OFFSET } from "../../consts";
import { generateGroupItemsPositions } from "../../helpers/group";
import { createGroupChildren, createGroup, clearGroupChildren } from "../../helpers/scene";
import { Images } from "../../types";
import { getWindowInnerSize } from "../../utils/dom";

export let ballGeneratorTimerId: number | null = null;

export function createBalls(scene: Phaser.Scene): Phaser.Physics.Arcade.Group {
    const balls = createGroup(scene, { bounceY: 0.5, bounceX: 0.5, collideWorldBounds: true });

    ballGenerator(balls, BALLS_GENERATE_COUNT, BALLS_GENERATE_DELAY);

    return balls;
}

function ballGenerator(ballsGroup: Phaser.Physics.Arcade.Group, starsCount: number, delay: number) {
    ballGeneratorTimerId = window.setInterval(() => {
        const [height, width] = getWindowInnerSize();
        const starsPositions = generateGroupItemsPositions(starsCount, width, height - GROUND_OFFSET);

        clearGroupChildren(ballsGroup, BALLS_GENERATE_COUNT);
        createGroupChildren(ballsGroup, Images.Ball, starsPositions);

        
    }, delay);
}