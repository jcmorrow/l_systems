const CHANGE_RATE = 1.0 / 300.0;
const FRAME_RATE = 60;
const SPOKE_COUNT = 100;
const NOISE = (Math.PI / SPOKE_COUNT) * 2.0;
const DIAMETER = 15.0;
const GRAVITY = 0.1;

let time = 0;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(20, 20, 20);
  translate(windowWidth / 2.0, windowHeight / 2.0 - 100.0);
  rotate(Math.PI / 4.0);

  stroke(255, 255, 255);
  fill(20, 20, 20);

  let points = _.range(SPOKE_COUNT).map(_ => [0, 0]);

  for (let outer of _.range(45)) {
    points = _.range(SPOKE_COUNT).map(i => {
      // noise.eval(scale*x,scale*y)
      // noise.eval(scale*x,scale*y,radius*cos(TWO_PI*t),radius*sin(TWO_PI*t))
      let newDistance = [
        coord(i, Math.cos) *
          noise(
            i * NOISE,
            outer * NOISE * 2.0,
            RADIUS * Math.cos((TWO_PI * i) / SPOKE_COUNT)
          ) +
          outer * GRAVITY,
        coord(i, Math.sin) *
          noise(
            i * NOISE,
            outer * NOISE * 2.0,
            Math.sin((TWO_PI * i) / SPOKE_COUNT)
          ) +
          outer * GRAVITY
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

  // time += CHANGE_RATE;
}

function coord(spoke: any, fn: any) {
  let toFn = (spoke * Math.PI * 2.0) / SPOKE_COUNT;
  return fn(toFn) * DIAMETER;
}
