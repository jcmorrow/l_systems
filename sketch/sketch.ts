const forward = () => {
  line(0, 0, LINE_SIZE, 0);
  translate(LINE_SIZE, 0);
};
const pushGlobal = () => push();
const popGlobal = () => pop();
const turnRight = () => rotate(ANGLE);
const turnLeft = () => rotate(-ANGLE);

/* ---------------------------------------------------------------------------*/

//    variables : X F
// constants : + − [ ]
// start : X
// rules : (X → F+[[X]-X]-F[-FX]+X), (F → FF)
// angle : 25°
//
const degreesToRadians = (degrees: number) => (degrees / 360.0) * Math.PI * 2.0;

const ANGLE = degreesToRadians(35.0);
const LINE_SIZE = 5.0;
let system: string = "X";

let RULES = {
  F: forward,
  "+": turnRight,
  "-": turnLeft,
  "[": pushGlobal,
  "]": popGlobal
};

let TRANSFORMS = {
  F: "FFFX",
  X: "F+[[+XFFX]-X]-F[-FX]+X"
};
let MAX_STEPS = 7;

/* ---------------------------------------------------------------------------*/
let step: number = 0;

let executeRule = (rule: string) => {
  if (hasKey(RULES, rule)) {
    RULES[rule]();
  }
};

let expandRule: (rule: string) => string = (rule: string) => {
  if (hasKey(TRANSFORMS, rule)) {
    return TRANSFORMS[rule];
  } else {
    return rule;
  }
};

function setup() {
  frameRate(1);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  translate(windowWidth / 2.0, windowHeight / 2.0);
  rotate(-Math.PI / 2.0);
  let newSystem: string = "";
  for (let part of system) {
    executeRule(part);
    newSystem = newSystem + expandRule(part);
  }
  system = newSystem;
  step += 1;
  console.log(step);
  if (step >= MAX_STEPS) {
    noLoop();
  }
}

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}
