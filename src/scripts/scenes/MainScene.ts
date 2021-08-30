/* eslint-disable no-param-reassign */
import * as Phaser from 'phaser';

import { Image, ItemPosition, PlatformType } from '../../types';
import { getImages } from '../../helpers/path';
import { getWindowSize } from '../../utils/screen';
import {
  collideEmitterConfig,
  createComplexBlocksGroupsArr,
  createSimpleBlocksGroup,
  onResizeBlocksEffect,
} from '../../helpers/blocks';
import { throttle } from '../../utils/throttle';
import { getPlatformPosition } from '../../helpers/platform';
import { getTailEmitterConfig } from '../../helpers/ball';
import { PlatformSprite } from '../objects/PlatformSprite';
import { BallSprite } from '../objects/BallSprite';
import { BALL_SPEED, PLATFORMS_COUNT, PLATFORM_SPEED } from '../../const';
import { ScoreText } from '../objects/ScoreText';
import { InfoText } from '../objects/InfoText';
import { BlockSprite } from '../objects/BlockSprite';

let gameOver = false;
let gameIsPaused = false;
let ballVelosity = {
  x: 0,
  y: 0,
};

export class MainScene extends Phaser.Scene {
  private simpleBlocksGroup: Phaser.Physics.Arcade.StaticGroup;

  private complexBlocksGroupsArr: Phaser.Physics.Arcade.StaticGroup[];

  private complexBlocksColliders: Record<number, Phaser.Physics.Arcade.Collider> = {};

  private ball: Phaser.Physics.Arcade.Sprite;

  private platform: PlatformSprite;

  private cursor: Phaser.Types.Input.Keyboard.CursorKeys;

  private tailEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

  private particleGreen: Phaser.GameObjects.Particles.ParticleEmitterManager;

  private particleBlue: Phaser.GameObjects.Particles.ParticleEmitterManager;

  private infoText: InfoText;

  private scoreText: ScoreText;

  private platformCounts: number = 0;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.resizeListener();
  }

  public preload() {
    const imagesPaths = getImages();
    this.load.image(imagesPaths);
  }

  public create() {
    this.createCursor();
    this.createBackground();
    this.createBlocksGroup();
    this.createBallSprite();
    this.createTaiParticles();
    this.createCollideParticles();
    this.createPlatformSprite(Image.Platform1, getPlatformPosition());
    this.createInfoText();
    this.addColliders();
    this.addKeyboardInterrapt();

    this.createScoreText();
    this.platformCounts = PLATFORMS_COUNT;
  }

  public update() {
    this.handleKeyPress();

    this.physics.world.on('worldbounds', (body, up, down) => {
      if (down && !gameOver) {
        this.gameOver();
      }
    });
  }

  private gameOver() {
    gameOver = true;
    this.ball.setVelocity(0, 0);
    this.tailEmitter.setVisible(false);
    this.infoText.showGameoverText();
  }

  private createBackground() {
    const { height, width } = getWindowSize();
    this.add.tileSprite(0, 0, width * 4, height * 4, Image.Background);
  }

  private createBlocksGroup() {
    this.simpleBlocksGroup = createSimpleBlocksGroup(this);
    this.complexBlocksGroupsArr = createComplexBlocksGroupsArr(this, this.physics.world);
  }

  private createBallSprite() {
    const { height, width } = getWindowSize();

    this.ball = new BallSprite(this, width / 2, height / 2, Image.Ball);
    this.ball.setVelocityX(BALL_SPEED);
    this.ball.setVelocityY(BALL_SPEED);
  }

  private createPlatformSprite(image: Image, position: ItemPosition) {
    const { x, y } = position;

    this.platform = new PlatformSprite(this, x, y, image);
    this.platform.body.immovable = true;
    this.platform.setCollideWorldBounds(true);
  }

  private addColliders() {
    this.physics.add.collider(this.ball, this.platform);
    this.physics.add.collider(
      this.ball, this.simpleBlocksGroup,
      this.collideBlockGroup as () => void,
      undefined,
      this,
    );

    this.complexBlocksGroupsArr.forEach((blocksGroup) => {
      this.physics.add.collider(blocksGroup, [this.simpleBlocksGroup]);
      blocksGroup.getChildren().forEach((block) => {
        const blockGroupItemId = block.getData('id');
        const colliders = this.complexBlocksColliders;

        colliders[blockGroupItemId] = this.physics.add.collider(
          this.ball, block,
          () => {
            this.decreasePlatformsCount();
            blocksGroup.getChildren().forEach((blockItem) => {
              (blockItem as BlockSprite).onCollider();
              colliders[blockItem.getData('id')].destroy();
            });
          },
          undefined,
          this,
        );
      });
    });
  }

  private createCursor() {
    this.cursor = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  private createScoreText() {
    const { height } = getWindowSize();
    this.scoreText = new ScoreText(this, 20, height - 50, '', { fontSize: '24px' });
  }

  private resizeListener() {
    window.addEventListener('resize', throttle(() => {
      this.platform.onResize();
      onResizeBlocksEffect(this.simpleBlocksGroup);
    }, 200));
  }

  private decreasePlatformsCount() {
    this.platformCounts -= 1;

    if (this.platformCounts <= 0) {
      this.gameOver();
    }
  }

  private collideBlockGroup(
    ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    platform: Phaser.GameObjects.TileSprite,
  ) {
    const platformType = platform.getData('type');
    const platformPoints = platform.getData('points');
    const particle = platformType === PlatformType.Green ? this.particleGreen : this.particleBlue;

    platform.destroy();
    particle.emitParticleAt(platform.x, platform.y, 50);
    this.scoreText.increaseScore(platformPoints);

    if (platformType === PlatformType.Bonus) {
      // const currentPlatformPosition = this.platform.getTopCenter();
      // this.platform.destroy();
      // this.createPlatformSprite(Image.Platform2, currentPlatformPosition);
      // this.physics.add.collider(this.ball, this.platform);
      this.platform.scaleX = 1.5;
    }

    this.decreasePlatformsCount();
  }

  private createTaiParticles() {
    const particles = this.add.particles(Image.Fire1);
    this.tailEmitter = particles.createEmitter(getTailEmitterConfig(this.ball));
  }

  private createCollideParticles() {
    this.particleGreen = this.add.particles(Image.Fire1);
    this.particleBlue = this.add.particles(Image.Ball);
    this.particleGreen.createEmitter(collideEmitterConfig);
    this.particleBlue.createEmitter(collideEmitterConfig);
  }

  private createInfoText() {
    const { height, width } = getWindowSize();
    const fontSize = width > 720 ? 32 : 14;
    const textIndent = width > 720 ? 275 : 125;
    const posX = width / 2 - textIndent;
    const posY = height / 2;

    this.infoText = new InfoText(this, posX, posY, '', { font: `${fontSize}px Arial` });
  }

  private addKeyboardInterrapt() {
    this.input.keyboard.on('keydown-SPACE', () => {
      if (gameOver) {
        gameOver = false;
        this.scene.restart();
        return;
      }

      if (gameIsPaused) {
        this.ball.setVelocity(ballVelosity.x, ballVelosity.y);
        this.tailEmitter.setVisible(true);
        gameIsPaused = false;
        this.infoText.hideInfoText();
      } else {
        gameIsPaused = true;
        ballVelosity = {
          x: this.ball.body.velocity.x,
          y: this.ball.body.velocity.y,
        };
        this.ball.setVelocity(0, 0);
        this.tailEmitter.setVisible(false);
        this.infoText.showPauseText();
      }
    });
  }

  private handleKeyPress() {
    if (this.cursor.left.isDown) {
      this.platform.setVelocityX(-PLATFORM_SPEED);
    } else if (this.cursor.right.isDown) {
      this.platform.setVelocityX(PLATFORM_SPEED);
    } else {
      this.platform.setVelocityX(0);
    }
  }
}
