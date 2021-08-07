import * as Phaser from 'phaser';

class ScenesProvider {
  private scenes: Record<string, Phaser.Scene> = {};

  public createNewScene(name: string) {
    const scene = new Phaser.Scene({ key: name });
    this.scenes[name] = scene;

    return scene;
  }

  public setSceneUpdateFunction(name: string, update: () => void) {
    if (!this.scenes[name]) {
      return;
    }

    this.scenes[name].update = update;
  }

  public setSceneCreateFunction(name: string, create: () => void) {
    if (!this.scenes[name]) {
      return;
    }

    (this.scenes[name] as any).create = create;
  }

  public setScenePreloadFunction(name: string, preload: () => void) {
    if (!this.scenes[name]) {
      return;
    }

    (this.scenes[name] as any).preload = preload;
  }

  public getScene(name: string): Phaser.Scene | null {
    if (!this.scenes[name]) {
      return null;
    }

    return this.scenes[name];
  }
}

export default new ScenesProvider();
