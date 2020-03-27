const CHANGE_RATE = 1.0 / 300.0;
const NOISE = 1.0 / 1000.0;
const PARTICLE_COUNT = 10000;
const SCALE = 200.0;

let time = 0;

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(20, 20, 20);
  translate(windowWidth / 2.0, windowHeight / 2.0);

  stroke(255, 255, 255);

  for (let i of _.range(PARTICLE_COUNT)) {
    point(
      Math.cos(i) * noise(i * NOISE, time * NOISE) * SCALE,
      Math.sin(i) * noise(i * NOISE, time * NOISE) * SCALE
    );
  }

  time += 1;
}
