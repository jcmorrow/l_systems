var Shapes = (function () {
    function Shapes() {
    }
    Shapes.star = function (x, y, radius1, radius2, npoints) {
        var angle = TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        var points = new Array();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius2;
            var sy = y + sin(a) * radius2;
            points.push(createVector(sx, sy));
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            points.push(createVector(sx, sy));
        }
        return points;
    };
    return Shapes;
}());
var CIRCLE_RADIUS = 400;
var DOT_COUNT = 1000;
var DOT_SIZE = 1.0;
var FRAME_RATE = 60;
var NOISE_SCALE = 0.01;
var REPEAT_EVERY = 100;
var Point = (function () {
    function Point(theta, distance) {
        this.theta = theta;
        this.distance = distance;
    }
    Point.prototype.points = function () {
        return {
            x: Math.cos(this.theta) * this.distance * CIRCLE_RADIUS,
            y: Math.sin(this.theta) * this.distance * CIRCLE_RADIUS,
        };
    };
    return Point;
}());
var time = 0;
var dots;
var randomPoint = function () {
    return new Point(random() * TWO_PI, random());
};
function setup() {
    frameRate(FRAME_RATE);
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    background(20, 20, 20);
    dots = _.range(DOT_COUNT).map(function () { return randomPoint(); });
}
function draw() {
    translate(windowWidth / 2.0, windowHeight / 2.0);
    fill(255, 255, 255);
    stroke(255, 255, 255);
    background(20, 20, 20);
    dots.map(function (p) {
        var _a = p.points(), x = _a.x, y = _a.y;
        var xDisplacement = displacement(p, time);
        var yDisplacement = displacement(p, time);
        ellipse(x + xDisplacement, y + yDisplacement, DOT_SIZE, DOT_SIZE);
    });
    time = time + 0.001;
}
function displacement(p, time) {
    var _a = p.points(), x = _a.x, y = _a.y;
    return (noise(x * 0.0001, y * 0.0001, time) * (1 - p.distance) * CIRCLE_RADIUS -
        CIRCLE_RADIUS / 2.0);
}
function loopingNoise(iteration) {
    var answer = noise(NOISE_SCALE * octave(iteration) * 0.1, Math.cos(TWO_PI * octave(iteration)) * 2, Math.sin(TWO_PI * octave(iteration)) * 2);
    return answer;
}
var octave = function (i) {
    return (i % REPEAT_EVERY) / REPEAT_EVERY;
};
//# sourceMappingURL=build.js.map