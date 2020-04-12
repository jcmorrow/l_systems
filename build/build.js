var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.rainbowColorBase = function () {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    };
    ColorHelper.getColorsArray = function (total, baseColorArray) {
        var _this = this;
        if (baseColorArray === void 0) { baseColorArray = null; }
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(function (x) { return _this.getColorVector(x); });
        ;
        var colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    };
    ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    };
    return ColorHelper;
}());
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
var CHANGE_RATE = 1.0 / 300.0;
var FRAME_RATE = 60;
var SPOKE_COUNT = 100;
var NOISE = (Math.PI / SPOKE_COUNT) * 2.0;
var DIAMETER = 15.0;
var GRAVITY = 0.1;
var time = 0;
function setup() {
    frameRate(FRAME_RATE);
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
}
function draw() {
    background(20, 20, 20);
    translate(windowWidth / 2.0, windowHeight / 2.0 - 100.0);
    rotate(Math.PI / 4.0);
    stroke(255, 255, 255);
    fill(20, 20, 20);
    var points = _.range(SPOKE_COUNT).map(function (_) { return [0, 0]; });
    var _loop_1 = function (outer) {
        points = _.range(SPOKE_COUNT).map(function (i) {
            var newDistance = [
                coord(i, Math.cos) *
                    noise(i * NOISE, outer * NOISE * 2.0, RADIUS * Math.cos((TWO_PI * i) / SPOKE_COUNT)) +
                    outer * GRAVITY,
                coord(i, Math.sin) *
                    noise(i * NOISE, outer * NOISE * 2.0, Math.sin((TWO_PI * i) / SPOKE_COUNT)) +
                    outer * GRAVITY
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
}
function coord(spoke, fn) {
    var toFn = (spoke * Math.PI * 2.0) / SPOKE_COUNT;
    return fn(toFn) * DIAMETER;
}
//# sourceMappingURL=build.js.map