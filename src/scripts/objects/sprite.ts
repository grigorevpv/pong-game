import { GAME_PLAYER_SPRITE_BOUNCE, GAME_PLAYER_SPRITE, spriteFrames } from "../../consts";
import { addSpriteAnims, createSprite, setSpriteBounce, setSpriteCollideWorldBounds } from "../../helpers/sprite";
import { Key } from "../../types";

const DEFAULT_PLAYER_RUN_SPEED = 260;
const DEFAULT_PLAYER_JUMP_SPEED = 430;

export function createPlayerSprite(scene: Phaser.Scene): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    const player = createSprite(scene, GAME_PLAYER_SPRITE)

    setSpriteBounce(player, GAME_PLAYER_SPRITE_BOUNCE)
    setSpriteCollideWorldBounds(player, true)
    addSpriteAnims(scene, spriteFrames)

    return player
}

export function movePlayerLeft(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    player.setVelocityX(-DEFAULT_PLAYER_RUN_SPEED)
    player.anims.play(Key.Left, true)
}

export function movePlayerRight(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    player.setVelocityX(DEFAULT_PLAYER_RUN_SPEED)
    player.anims.play(Key.Right, true)
}

export function stopPlayer(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    player.setVelocityX(0)
    player.anims.play(Key.Turn)
}

export function movePlayerUp(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    if (player.body.touching.down) {
        player.setVelocityY(-DEFAULT_PLAYER_JUMP_SPEED)
    }
}

