const SCALE = 200.0;
const NOISE = 1.0 / 1000000.0;
const CHANGE_RATE = 1.0 / 300.0;
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

  for (let i of _.range(1000)) {
    point(
      Math.cos(i) * noise(i * time * NOISE, time * CHANGE_RATE) * SCALE,
      Math.sin(i) * noise(i * time * NOISE, time * CHANGE_RATE) * SCALE
    );
  }

  time += 1;
}
