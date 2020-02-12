const addVec = (vec1, vec2) => {
    return { x: vec1.x + vec2.x, y: vec1.y + vec2.y };
};
const subVec = (vec1, vec2) => {
    return { x: vec1.x - vec2.x, y: vec1.y - vec2.y };
};
const magnitude = (vec) => {
    return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
};
class Particle {
    constructor(position) {
        this.position = position;
        this.velocity = { x: 0, y: 0 };
    }
    accelerate(v) {
        this.velocity = v;
    }
    move() {
        this.position = addVec(this.velocity, this.position);
    }
}
class Gravity {
    forceAt(x, y, t) {
        return { x: 0, y: 0.001 };
    }
}
class Attractor {
    constructor(position) {
        this.position = position;
    }
    forceAt(x, y, t) {
        let r = subVec({ x, y }, this.position);
        let forceScalar = 0.75 / Math.pow(magnitude(r), 2);
        return { x: -r.x * forceScalar, y: -r.y * forceScalar };
    }
}
class Field {
    forceAt(x, y, t) {
        return {
            x: Math.cos(noise(x * 0.01, y * 0.01) * 2 * Math.PI) / 10.0,
            y: Math.sin(noise(x * 0.01, y * 0.01) * 2 * Math.PI) / 10.0
        };
    }
}
const MAX_VELOCITY = 10.0;
const PARTICLE_COUNT = 10000;
const FORCES = [
    new Field()
];
let t = 0;
let particles = Array.from(Array(PARTICLE_COUNT).keys(), () => new Particle({
    x: Math.random() * 1000.0 - 500.0,
    y: Math.random() * 1000.0 - 500.0
}));
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
//# sourceMappingURL=build.js.map