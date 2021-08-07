export function getTailEmitterConfig(ball: any) {
  return {
    radial: false,
    x: 100,
    y: { start: 0, end: 560, steps: 256 },
    lifespan: 2000,
    speedX: { min: 20, max: 200 },
    quantity: 4,
    gravityY: 0,
    scale: { start: 0.25, end: 0, ease: 'Power3' },
    blendMode: 'ADD',
    follow: ball,
  };
}
