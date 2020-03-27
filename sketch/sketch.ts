const CHANGE_RATE = 1.0 / 300.0;
const FRAME_RATE = 30;
const NOISE = 1.0 / 100.0;
const PARTICLE_COUNT = 100;
const SCALE = 20.0;
const SPOKE_COUNT = 20;

let time = 0;

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(20, 20, 20);
  translate(windowWidth / 2.0, windowHeight / 2.0);

  stroke(255, 255, 255);

  for (let theta of _.range(SPOKE_COUNT)) {
    for (let i of _.range(PARTICLE_COUNT)) {
      let base = i * SCALE;
      point(
        base +
          0.5 *
            base *
            noise(Math.cos(theta) * 0.01, Math.sin(theta) * 0.01, time * NOISE),
        0
      );
    }
    rotate((2.0 * Math.PI) / SPOKE_COUNT);
  }

  time += 1;
}
