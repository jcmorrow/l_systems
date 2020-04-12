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
var CHANGE_RATE = 300.0;
var FRAME_RATE = 1;
var SEED = 100;
var SPOKE_COUNT = 100;
var NOISE_SCALE = 0.1;
var DIAMETER = 30.0;
var GRAVITY = 0.05;
var REPEAT_EVERY = SPOKE_COUNT / 1.0;
function setup() {
    noiseSeed(SEED);
    frameRate(FRAME_RATE);
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    background(20, 20, 20);
}
function draw() {
    translate(windowWidth / 2.0, windowHeight / 2.0 - 100.0);
    rotate(Math.PI / 4.0);
    stroke(255, 255, 255);
    var points = _.range(SPOKE_COUNT).map(function (_) { return [0, 0]; });
    var _loop_1 = function (outer) {
        points = _.range(SPOKE_COUNT).map(function (i) {
            var newDistance = [
                coord(i, Math.cos) * loopingNoise(i) + outer * GRAVITY,
                coord(i, Math.sin) * loopingNoise(i) + outer * GRAVITY,
            ];
            return [points[i][0] + newDistance[0], points[i][1] + newDistance[1]];
        });
        for (var _i = 0, _a = _.range(SPOKE_COUNT); _i < _a.length; _i++) {
            var i = _a[_i];
            curve(points[i][0], points[i][1], points[(i + 1) % SPOKE_COUNT][0], points[(i + 1) % SPOKE_COUNT][1], points[(i + 2) % SPOKE_COUNT][0], points[(i + 2) % SPOKE_COUNT][1], points[(i + 3) % SPOKE_COUNT][0], points[(i + 3) % SPOKE_COUNT][1]);
        }
    };
    for (var _i = 0, _a = _.range(45); _i < _a.length; _i++) {
        var outer = _a[_i];
        _loop_1(outer);
    }
    noLoop();
}
function coord(spoke, fn) {
    var toFn = (spoke * Math.PI * 2.0) / SPOKE_COUNT;
    return fn(toFn) * DIAMETER;
}
function loopingNoise(iteration) {
    var answer = noise(NOISE_SCALE * octave(iteration), NOISE_SCALE * Math.cos(TWO_PI * octave(iteration)), NOISE_SCALE * Math.sin(TWO_PI * octave(iteration)));
    return answer;
}
var octave = function (i) {
    return (i % REPEAT_EVERY) / REPEAT_EVERY;
};
//# sourceMappingURL=build.js.map