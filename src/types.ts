export interface SceneImage {
    name: string;
    src: string;
}

export interface FrameSize {
    frameWidth: number,
    frameHeight: number,
}

export interface SceneSpriteSheet {
    name: string;
    src: string;
    frameSize: FrameSize;
}

export interface GamePhysicsArcade {
    default: GameType.Arcade;
    [GameType.Arcade]: {
        gravity: {
            y: number;
        },
        debug: boolean;
    }
}

export type GamePhysics = GamePhysicsArcade;

export enum GameType {
    Arcade = 'arcade'
}

export interface Coordinate {
    x: number;
    y: number;
    z?: number;
}

export interface GroupItemPosition extends Coordinate {
    scale?: number;
}

export interface StaticGroupItem extends GroupItemPosition {
    name: string;
}

export interface Sprite extends StaticGroupItem {}

export interface FrameNumbers {
    key: SpriteSheets,
    start?: number;
    end?: number;
    frame?: number;
}

export interface SpriteAnims {
    key: Key;
    frames: FrameNumbers;
    frameRate: number;
    repeat?: number;
}

export enum Key {
    Left = 'left',
    Turn = 'turn',
    Right = 'right',
}

export enum Images {
    Bomb = 'bomb',
    Platform = 'platform',
    Sky = 'sky',
    Star = 'star',
    Ball = 'ball',
    Bum = 'bum',
    Gift = 'gift'
};

export enum SpriteSheets {
    Dude = 'dude',
}

export type Asserts = Images | SpriteSheets;
