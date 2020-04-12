const CHANGE_RATE = 300.0;
const FRAME_RATE = 1;
const SEED = 100;
const SPOKE_COUNT = 100;
const NOISE_SCALE = 0.1;
const DIAMETER = 30.0;
const GRAVITY = 0.05;
const REPEAT_EVERY = SPOKE_COUNT / 1.0;

function setup() {
  noiseSeed(SEED);
  frameRate(FRAME_RATE);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  background(20, 20, 20);
}

function draw() {
  translate(windowWidth / 2.0, windowHeight / 2.0 - 100.0);
  rotate(Math.PI / 4.0);

  stroke(255, 255, 255);

  let points = _.range(SPOKE_COUNT).map((_) => [0, 0]);

  for (let outer of _.range(45)) {
    points = _.range(SPOKE_COUNT).map((i) => {
      let newDistance = [
        coord(i, Math.cos) * loopingNoise(i) + outer * GRAVITY,
        coord(i, Math.sin) * loopingNoise(i) + outer * GRAVITY,
      ];
      return [points[i][0] + newDistance[0], points[i][1] + newDistance[1]];
    });
    for (let i of _.range(SPOKE_COUNT)) {
      curve(
        points[i][0],
        points[i][1],
        points[(i + 1) % SPOKE_COUNT][0],
        points[(i + 1) % SPOKE_COUNT][1],
        points[(i + 2) % SPOKE_COUNT][0],
        points[(i + 2) % SPOKE_COUNT][1],
        points[(i + 3) % SPOKE_COUNT][0],
        points[(i + 3) % SPOKE_COUNT][1]
      );
    }
  }
  noLoop();
}

function coord(spoke: any, fn: any) {
  let toFn = (spoke * Math.PI * 2.0) / SPOKE_COUNT;
  return fn(toFn) * DIAMETER;
}

function loopingNoise(iteration: number): number {
  const answer = noise(
    NOISE_SCALE * octave(iteration),
    NOISE_SCALE * Math.cos(TWO_PI * octave(iteration)),
    NOISE_SCALE * Math.sin(TWO_PI * octave(iteration))
  );

  return answer;
}

const octave: (i: number) => number = (i: number): number =>
  (i % REPEAT_EVERY) / REPEAT_EVERY;
