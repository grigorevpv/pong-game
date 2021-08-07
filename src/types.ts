/* eslint-disable no-unused-vars */
export enum Image {
    Ball = 'ball',
    Background = 'background',
    Bonus = 'bonus',
    Block1 = 'block1',
    Block2 = 'block2',
    Platform1 = 'platform1',
    Fire1 = 'fire1',
}

export interface ItemSize {
    height: number;
    width: number;
}

export type WindowSize = ItemSize;

export interface ItemPosition {
    x: number;
    y: number;
}

export enum PlatformType {
    Green,
    Blue,
    Bonus,
}

export interface PlatformData {
    type: PlatformType,
    image: Image,
    points: number,
    particlesImage: Image,
}

export type PlatformPoints = Record<PlatformType, number>;

export type PlatformImage = Record<PlatformType, Image>;

export type PlatformParticlesImage = Record<PlatformType, Image>;
