const SCALE = 200.0;
let time = 0;

function setup() {
  frameRate(10);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  translate(windowWidth / 2.0, windowHeight / 2.0);
  background(20, 20, 20);
  console.log(_.range(10));

  stroke(255, 255, 255);

  for (let i of _.range(1000)) {
    point(
      Math.cos(i) * noise(i / 1000.0, time / 200.0) * SCALE,
      Math.sin(i) * SCALE * noise(i / 1000.0, time / 200.0)
    );
  }

  time += 1;
}
