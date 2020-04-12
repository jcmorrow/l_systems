const CIRCLE_RADIUS = 400;
const DOT_COUNT = 1000;
const DOT_SIZE = 1.0;
const FRAME_RATE = 60;
const NOISE_SCALE = 0.01;
const REPEAT_EVERY = 100;

class Point {
  theta: number;
  distance: number;

  constructor(theta: number, distance: number) {
    this.theta = theta;
    this.distance = distance;
  }

  points(): { x: number; y: number } {
    return {
      x: Math.cos(this.theta) * this.distance * CIRCLE_RADIUS,
      y: Math.sin(this.theta) * this.distance * CIRCLE_RADIUS,
    };
  }
}

let time = 0;
let dots: Point[];

const randomPoint: () => Point = (): Point =>
  new Point(random() * TWO_PI, random());

function setup() {
  // noiseSeed(2020);
  frameRate(FRAME_RATE);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  background(20, 20, 20);

  dots = _.range(DOT_COUNT).map(() => randomPoint());
}

function draw() {
  translate(windowWidth / 2.0, windowHeight / 2.0);

  fill(255, 255, 255);
  stroke(255, 255, 255);
  background(20, 20, 20);

  dots.map((p) => {
    const { x, y } = p.points();
    const xDisplacement = displacement(p, time);
    const yDisplacement = displacement(p, time);
    ellipse(x + xDisplacement, y + yDisplacement, DOT_SIZE, DOT_SIZE);
  });

  time = time + 0.001;
}

function displacement(p: Point, time: number): number {
  const { x, y } = p.points();
  return (
    noise(x * 0.0001, y * 0.0001, time) * (1 - p.distance) * CIRCLE_RADIUS -
    CIRCLE_RADIUS / 2.0
  );
}

function loopingNoise(iteration: number): number {
  const answer = noise(
    NOISE_SCALE * octave(iteration) * 0.1,
    Math.cos(TWO_PI * octave(iteration)) * 2,
    Math.sin(TWO_PI * octave(iteration)) * 2
  );

  return answer;
}

const octave: (i: number) => number = (i: number): number =>
  (i % REPEAT_EVERY) / REPEAT_EVERY;
