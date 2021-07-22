import { BOMBS_GENERATE_COUNT, BOMBS_GENERATE_DELAY, GROUND_OFFSET } from "../../consts";
import { clearIntervals, generateGroupItemsPositions } from "../../helpers/group";
import { createGroupChildren, createGroup, clearGroupChildren } from "../../helpers/scene";
import { Images } from "../../types";
import { getWindowInnerSize } from "../../utils/dom";
import { ballGeneratorTimerId } from "./ball";
import { starsGeneratorTimerId } from "./star";

export let bombGeneratorTimerId: number | null = null;

export function createBombs(scene: Phaser.Scene): Phaser.Physics.Arcade.Group {
    const bombs = createGroup(scene, { bounceY: 0.9, bounceX: 0.9, collideWorldBounds: true, velocityX: 50, velocityY: 100 });

    bombGenerator(bombs, BOMBS_GENERATE_COUNT, BOMBS_GENERATE_DELAY);

    return bombs;
}

function bombGenerator(ballsGroup: Phaser.Physics.Arcade.Group, starsCount: number, delay: number) {
    bombGeneratorTimerId = window.setInterval(() => {
        const [height, width] = getWindowInnerSize();
        const starsPositions = generateGroupItemsPositions(starsCount, width, height - GROUND_OFFSET);

        clearGroupChildren(ballsGroup, BOMBS_GENERATE_COUNT);
        createGroupChildren(ballsGroup, Images.Bomb, starsPositions);

        
    }, delay);
}

export function overlapBombCallback(scene: Phaser.Scene) {
    return function(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, star:  any) {
        scene.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');

        clearIntervals([
            starsGeneratorTimerId,
            ballGeneratorTimerId,
            bombGeneratorTimerId
        ])


    }
}
