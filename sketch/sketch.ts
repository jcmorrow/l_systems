const forward = (lineSize: number) => {
  line(0, 0, lineSize, 0);
  translate(lineSize, 0);
};
const pushGlobal = () => push();
const popGlobal = () => pop();
const turnRight = (angle: number) => rotate(angle);
const turnLeft = (angle: number) => rotate(-angle);

/* ---------------------------------------------------------------------------*/

// variables : X F
// constants : + − [ ]
// start : X
// rules : (X → F+[[X]-X]-F[-FX]+X), (F → FF)
// angle : 25°

const toDegrees = (angle: number) => (angle * (Math.PI * 2.0)) / 360.0;

const ANGLE = toDegrees(25);
const LINE_SIZE = 5.0;

let system: string = "X";

let RULES = [
  { name: "F", do: forward, args: [LINE_SIZE] },
  { name: "+", do: turnRight, args: [ANGLE] },
  { name: "-", do: turnLeft, args: [ANGLE] },
  { name: "[", do: pushGlobal, args: [] },
  { name: "]", do: popGlobal, args: [] },
];

let TRANSFORMS = {
  F: "FF",
  X: "F+[[X]-X]-F[-FX]+X",
};
let MAX_STEPS = 10;

/* ---------------------------------------------------------------------------*/
let step: number = 0;

let executeRule = (ruleName: string) => {
  const rule = RULES.find((r) => r.name == ruleName);
  rule.do(...rule["args"]);
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
  translate(windowWidth / 2.0, windowHeight);
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
