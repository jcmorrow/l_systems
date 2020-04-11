// const CHANGE_RATE = 1.0 / 300.0;
// const SPOKE_COUNT = 100;
// const NOISE = (Math.PI / SPOKE_COUNT) * 2.0;
// const GRAVITY = 0.1;

const FRAME_RATE = 60;
const DIAMETER = 100000;

let time = 1;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(20, 20, 20);
  translate(windowWidth / 2.0, windowHeight / 2.0 - 100.0);

  stroke(255, 255, 255);
  fill(20, 20, 20);

  let diameter = DIAMETER / time ** 2;
  ellipse(0, diameter / 2.0, diameter, diameter);
  time += 0.01;
}

function coord(spoke: any, fn: any) {
  let toFn = (spoke * Math.PI * 2.0) / SPOKE_COUNT;
  return fn(toFn) * DIAMETER;
}
