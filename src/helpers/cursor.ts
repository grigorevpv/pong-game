export function createCursor(scene: Phaser.Scene): Phaser.Types.Input.Keyboard.CursorKeys {
    return scene.input.keyboard.createCursorKeys()
}

export function onLeftButtonDown(cursor: Phaser.Types.Input.Keyboard.CursorKeys, leftAction: () => void) {
    if (cursor.left.isDown) {
        leftAction()
    }
}

export function onRightButtonDown(cursor: Phaser.Types.Input.Keyboard.CursorKeys, rightAction: () => void) {
    if (cursor.right.isDown) {
        rightAction()
    }
}

export function onUpButtonDown(cursor: Phaser.Types.Input.Keyboard.CursorKeys, upAction: () => void) {
    if (cursor.up.isDown) {
        upAction()
    }
}

export function onNoneButtonDown(cursor: Phaser.Types.Input.Keyboard.CursorKeys, noneAction: () => void) {
    if (!cursor.left.isDown && !cursor.right.isDown) {
        noneAction()
    }
}


