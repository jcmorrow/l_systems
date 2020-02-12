interface Vector {
  x: number;
  y: number;
}

const addVec = (vec1: Vector, vec2: Vector): Vector => {
  return { x: vec1.x + vec2.x, y: vec1.y + vec2.y };
};

const subVec = (vec1: Vector, vec2: Vector): Vector => {
  return { x: vec1.x - vec2.x, y: vec1.y - vec2.y };
};

const magnitude = (vec: Vector): number => {
  return Math.sqrt(vec.x ** 2 + vec.y ** 2);
};

class Particle {
  public velocity: Vector;
  constructor(public position: Vector) {
    this.velocity = { x: 0, y: 0 };
  }

  accelerate(v: Vector) {
    this.velocity = v; //addVec(this.velocity, v);
  }

  move() {
    this.position = addVec(this.velocity, this.position);
  }
}

interface Force {
  forceAt(x: number, y: number, t: number): Vector;
}

class Gravity implements Force {
  forceAt(x: number, y: number, t: number) {
    return { x: 0, y: 0.001 };
  }
}

class Attractor implements Force {
  constructor(public position: Vector) {}

  forceAt(x: number, y: number, t: number) {
    let r = subVec({ x, y }, this.position);
    let forceScalar = 0.75 / magnitude(r) ** 2;
    return { x: -r.x * forceScalar, y: -r.y * forceScalar };
  }
}

class Field implements Force {
  forceAt(x: number, y: number, t: number) {
    return {
      x: Math.cos(noise(x * 0.01, y * 0.01) * 2 * Math.PI) / 10.0,
      y: Math.sin(noise(x * 0.01, y * 0.01) * 2 * Math.PI) / 10.0
    };
  }
}

const MAX_VELOCITY = 10.0;
const PARTICLE_COUNT = 10000;
const FORCES = [
  // new Gravity(),
  new Field()
  // new Attractor({ x: 50, y: 0 }),
  // new Attractor({ x: 250, y: 100 })
];
let t = 0;

let particles = Array.from(
  Array(PARTICLE_COUNT).keys(),
  () =>
    new Particle({
      x: Math.random() * 1000.0 - 500.0,
      y: Math.random() * 1000.0 - 500.0
    })
);

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  strokeWeight(2);
  translate(windowWidth / 2.0, windowHeight / 2.0);
  for (let p of particles) {
    for (let force of FORCES) {
      p.accelerate(force.forceAt(p.position.x, p.position.y, t));
    }
    p.move();
    stroke(`rgba(0, 0, 0, ${magnitude(p.velocity) / MAX_VELOCITY})`);
    point(p.position.x, p.position.y);
  }
  t += 1;
}
