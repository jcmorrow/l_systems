const FRAME_RATE = 1;
const LEVELS = 25;
const SUBDIVISIONS = 1000;

let time = 0;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  let jump = 40;

  setupFrame();
  let points = _
    .range(SUBDIVISIONS)
    .map(i => ({ x: i / (SUBDIVISIONS * 1.0), y: i }));
  let previousPoint = { x: 0, y: 0 };
  _.range(LEVELS).map(level => {
    points.forEach((point, i) => {
      const nextPoint = {
        x: point.x * windowWidth,
        y:
          noise(point.y / 200.0, level * 0.05) * (300.0 * (level / LEVELS) ** 2)
      };
      line(previousPoint.x, previousPoint.y, nextPoint.x, nextPoint.y);
      previousPoint = nextPoint;
    });
    previousPoint = { x: 0, y: 0 };
    translate(0, jump);
    jump = jump * 0.75;
  });
}

function setupFrame() {
  background(20, 20, 20);
  translate(windowWidth, windowHeight * 0.95);
  rotate(Math.PI);

  stroke(255, 255, 255);
  fill(20, 20, 20);
}
