import { Sprite, SpriteAnims } from "../types";

export function createSprite(scene: Phaser.Scene, sprite: Sprite): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return scene.physics.add.sprite(sprite.x, sprite.y, sprite.name);
}

export function addSpriteAnims(scene: Phaser.Scene, anims: SpriteAnims[]) {
    anims.forEach((anim) => {
        const frames =  anim.frames.frame ? 
        [{
            key: anim.frames.key,
            frame: anim.frames.frame
        }] : scene.anims.generateFrameNumbers(anim.frames.key, {
            start: anim.frames.start,
            end: anim.frames.end
        })

        scene.anims.create({
            key: anim.key,
            frames: frames,
            frameRate: anim.frameRate,
            repeat: anim.repeat
        })
    })
}

export function setSpriteBounce(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody ,value: number) {
    sprite.setBounce(value);
}

export function setSpriteCollideWorldBounds(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody ,value: boolean) {
    sprite.setCollideWorldBounds(value);
}

export function setGravityY(sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody ,value: number) {
    sprite.body.setGravityY(value);
}