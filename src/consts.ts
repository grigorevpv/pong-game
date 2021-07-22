import { GameType, Key, SpriteSheets } from "./types";

export const DEFAULT_WIDTH = 800;
export const DEFAULT_HEIGHT = 600;

export const DEFAULT_FRAME_HEIGHT = 48;
export const DEFAULT_FRAME_WIDTH = 32;

export const SCENE_LEVEL_ONE = "level1";
export const GAME_CONTAINER_ID = "test-game";
export const GAME_SCORE_KEY = "game-score";

export const YELLOW_STAR_POINTS = 10;
export const GIFT_POINTS = 25;

export const GIFTS_GENERATE_COUNT = 1;
export const BOMBS_GENERATE_COUNT = 3;
export const STARS_GENERATE_COUNT = 5;
export const BALLS_GENERATE_COUNT = 5;

export const BOMBS_GENERATE_DELAY = 10000;
export const GIFTS_GENERATE_DELAY = 10000;
export const BALLS_GENERATE_DELAY = 5000;
export const STARS_GENERATE_DELAY = 7000;

export const BOMBS_DESTROY_DELAY = 13000;
export const GIFT_DESTROY_DELAY = 7000;
export const BALLS_DESTROY_DELAY = 5000;

export const GROUND_OFFSET = 120;

export const ARCADE_GAME_PHYSICS = {
    default: GameType.Arcade,
    arcade: {
        gravity: {
            y: 300,
        },
        debug: false,
    }
}

export const GAME_PLAYER_SPRITE = {
    x: 100,
    y: 450,
    name: "dude",
}

export const GAME_PLAYER_SPRITE_BOUNCE = 0.2;


export const platformsPositionsArr = [
    {
        x: 400,
        y: 600,
        scale: 2
    },
    {
        x: 600,
        y: 400,
    },
    {
        x: 50,
        y: 250,
    },
    {
        x: 750,
        y: 220,
    },
]

export const spriteFrames = [
    {
        key: Key.Left,
        frames: {
            key: SpriteSheets.Dude, 
            start: 0,
            end: 3,
        },
        frameRate: 10,
        repeat: -1,
    },
    {
        key: Key.Right,
        frames: {
            key: SpriteSheets.Dude, 
            start: 5,
            end: 8
        },
        frameRate: 10,
        repeat: -1,
    },
    {
        key: Key.Turn,
        frames: {
            key: SpriteSheets.Dude, 
            frame: 4,
        },
        frameRate: 10,
    }
]