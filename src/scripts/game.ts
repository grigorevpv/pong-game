import 'phaser'
import { ARCADE_GAME_PHYSICS, SCENE_LEVEL_ONE } from '../consts'
import { getSceneImages, getSceneSpriteSheets } from '../helpers/asserts'
import { createCursor, onLeftButtonDown, onNoneButtonDown, onRightButtonDown, onUpButtonDown } from '../helpers/cursor'
import { clearIntervals } from '../helpers/group'
import { addSceneCollider, addSceneOverlap, preloadImages, preloadSpriteSheets } from '../helpers/scene'
import { increaseScore } from '../helpers/score'
import { GamePhysics, Images, SpriteSheets } from '../types'
import { getWindowInnerSize } from '../utils/dom'
import { ballGeneratorTimerId, createBalls } from './objects/ball'
import { bombGeneratorTimerId, createBombs, overlapBombCallback } from './objects/bomb'
import { createGifts, overlapGiftCallback } from './objects/gift'
import { createPlatforms } from './objects/platform'
import { createMaxScoreText, createScoreText } from './objects/scoreText'
import { createPlayerSprite, movePlayerLeft, movePlayerRight, movePlayerUp, stopPlayer } from './objects/sprite'
import { createStars, overlapStarCallback, starsGeneratorTimerId } from './objects/star'
import SceneProvider from './scenes/SceneProvider'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720


export function getGameConfig(scenes: Phaser.Scene[], physics: GamePhysics) {
  const [height, width] = getWindowInnerSize();

  return {
      type: Phaser.AUTO,
      backgroundColor: '#1199DD',
      scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: width || DEFAULT_WIDTH,
        height: height || DEFAULT_HEIGHT,
      },
      physics: physics,
      scene: [...scenes]
  }
}

let cursor
let player
let scoreText
let maxScoreText

function mainScenePreload(scene: Phaser.Scene) {
  return function() {
    preloadImages(scene, getSceneImages(Object.values(Images)))
    preloadSpriteSheets(scene, getSceneSpriteSheets(Object.values(SpriteSheets)))
  }
}

function mainSceneCreate(scene: Phaser.Scene) {
  return function() {
    const maxScore = Number(localStorage.getItem("game-score"))
    const platforms = createPlatforms(scene)
    const stars = createStars(scene)
    const balls = createBalls(scene)
    const bombs = createBombs(scene)
    const gifts = createGifts(scene)
    scoreText = createScoreText(scene)
    maxScoreText = createMaxScoreText(scene)
    player = createPlayerSprite(scene)
    cursor = createCursor(scene)

    const updateScore = increaseScore(scoreText, maxScore);

    addSceneCollider(scene, player, platforms)
    addSceneCollider(scene, stars, platforms)
    addSceneCollider(scene, balls, platforms)
    addSceneCollider(scene, gifts, platforms)
    addSceneCollider(scene, bombs, platforms)
    addSceneCollider(scene, player, balls)
    addSceneCollider(scene, gifts, balls)
    addSceneCollider(scene, gifts, gifts)
    addSceneCollider(scene, balls, balls)
    addSceneCollider(scene, balls, bombs)
    addSceneCollider(scene, bombs, bombs)
    addSceneCollider(scene, gifts, bombs)

    addSceneOverlap(scene, player, stars, overlapStarCallback(updateScore))
    addSceneOverlap(scene, player, gifts, overlapGiftCallback(updateScore))
    addSceneOverlap(scene, player, bombs, overlapBombCallback(scene))
  }
}

function mainSceneUpdate(scene: Phaser.Scene) {
  return function() {
    onLeftButtonDown(cursor, () => movePlayerLeft(player))
    onRightButtonDown(cursor, () => movePlayerRight(player))
    onNoneButtonDown(cursor, () => stopPlayer(player))
    onUpButtonDown(cursor, () => movePlayerUp(player))
  }
}

window.addEventListener('load', () => {
  const gameScene = SceneProvider.createNewScene(SCENE_LEVEL_ONE);

  SceneProvider.setScenePreloadFunction(SCENE_LEVEL_ONE, mainScenePreload(gameScene));
  SceneProvider.setSceneCreateFunction(SCENE_LEVEL_ONE, mainSceneCreate(gameScene));
  SceneProvider.setSceneUpdateFunction(SCENE_LEVEL_ONE, mainSceneUpdate(gameScene));

  const gameConfig = getGameConfig([gameScene], ARCADE_GAME_PHYSICS);
  const game = new Phaser.Game(gameConfig)
})

window.addEventListener("unload", () => {
  clearIntervals([
    starsGeneratorTimerId,
    ballGeneratorTimerId,
    bombGeneratorTimerId
  ])
})