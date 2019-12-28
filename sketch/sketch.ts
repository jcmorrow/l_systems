function setup() {
  frameRate(1);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

const ANGLE = (Math.PI * 2.0) / 3.0;
const LINE_SIZE = 2.0;
const forward = () => {
  line(0, 0, LINE_SIZE, 0);
  translate(LINE_SIZE, 0);
};
const turnLeft = () => rotate(ANGLE);
const turnRight = () => rotate(-ANGLE);

let step: number = 0;
let system: string = "F-G-G";

function draw() {
  translate(windowWidth / 2.0, windowHeight / 2.0);
  let newSystem: string = "";
  for (let part of system) {
    executeRule(part);
    newSystem = newSystem + expandRule(part);
  }
  system = newSystem;
  step += 1;
  console.log(step);
  if (step > 7) {
    noLoop();
  }
}

let executeRule = (rule: string) => {
  if (rule == "F") {
    forward();
  } else if (rule == "G") {
    forward();
  } else if (rule == "+") {
    turnLeft();
  } else if (rule == "-") {
    turnRight();
  }
};

let expandRule: (rule: string) => string = (rule: string) => {
  if (rule == "F") {
    return "F-G+F+G-F";
  } else if (rule == "G") {
    return "GG";
  } else {
    return rule;
  }
};
