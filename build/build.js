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
var FRAME_RATE = 1;
var LEVELS = 25;
var SUBDIVISIONS = 1000;
var time = 0;
function setup() {
    frameRate(FRAME_RATE);
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
}
function draw() {
    var jump = 40;
    setupFrame();
    var points = _
        .range(SUBDIVISIONS)
        .map(function (i) { return ({ x: i / (SUBDIVISIONS * 1.0), y: i }); });
    var previousPoint = { x: 0, y: 0 };
    _.range(LEVELS).map(function (level) {
        points.forEach(function (point, i) {
            var nextPoint = {
                x: point.x * windowWidth,
                y: noise(point.y / 200.0, level * 0.05) * (300.0 * Math.pow((level / LEVELS), 2))
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
//# sourceMappingURL=build.js.map