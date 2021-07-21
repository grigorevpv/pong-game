import { Images, SceneImage, SceneSpriteSheet, GroupItemPosition } from "../types";

export function preloadImages(scene: Phaser.Scene, images: SceneImage[]): void {
    images.forEach(function preload(img) {
        scene.load.image(img.name, img.src);
    })
}

export function preloadSpriteSheets(scene: Phaser.Scene, spriteSheets: SceneSpriteSheet[]): void {
    spriteSheets.forEach(function preload(spriteSheet) {
        scene.load.spritesheet(spriteSheet.name, spriteSheet.src, spriteSheet.frameSize);
    })
}

export function createStaticGroup(scene: Phaser.Scene): Phaser.Physics.Arcade.StaticGroup {
    return scene.physics.add.staticGroup();
}

export function createGroup(scene: Phaser.Scene, config: Phaser.Types.Physics.Arcade.PhysicsGroupConfig = {}): Phaser.Physics.Arcade.Group {
    return scene.physics.add.group(config);
}

export function createGroupChildren(
    group: Phaser.Physics.Arcade.StaticGroup | Phaser.Physics.Arcade.Group,
    name: Images,
    params: Array<GroupItemPosition>
) {
    params.forEach((item) => {
        if (item.scale) {
            group.create(item.x, item.y, name).setScale(item.scale).refreshBody();
        } else {
            group.create(item.x, item.y, name);
        }
    })
}

export function clearGroupChildren(
    group: Phaser.Physics.Arcade.Group,
    count: number
) {
    if (!count) {
        count = group.getLength();
    }

    const children = group.getChildren();

    children.slice(0, count).forEach(child => child.destroy());
}

export function addSceneCollider(
    scene: Phaser.Scene,
    body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | Phaser.Physics.Arcade.Group,
    group: Phaser.Physics.Arcade.StaticGroup | Phaser.Physics.Arcade.Group) {
        scene.physics.add.collider(body, group);
}

export function addSceneOverlap(
    scene: Phaser.Scene,
    body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | Phaser.Physics.Arcade.Group,
    group: Phaser.Physics.Arcade.Group,
    callback: (item1: any, item2: any) => void) {
        scene.physics.add.overlap(body, group, callback, undefined, scene);
}