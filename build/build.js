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
var FRAME_RATE = 30;
var NOISE = 1.0 / 100.0;
var PARTICLE_COUNT = 100;
var SCALE = 20.0;
var SPOKE_COUNT = 20;
var time = 0;
function setup() {
    frameRate(30);
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
}
function draw() {
    background(20, 20, 20);
    translate(windowWidth / 2.0, windowHeight / 2.0);
    stroke(255, 255, 255);
    for (var _i = 0, _a = _.range(SPOKE_COUNT); _i < _a.length; _i++) {
        var theta = _a[_i];
        for (var _b = 0, _c = _.range(PARTICLE_COUNT); _b < _c.length; _b++) {
            var i = _c[_b];
            var base = i * SCALE;
            point(base +
                0.5 *
                    base *
                    noise(Math.cos(theta) * 0.01, Math.sin(theta) * 0.01, time * NOISE), 0);
        }
        rotate((2.0 * Math.PI) / SPOKE_COUNT);
    }
    time += 1;
}
//# sourceMappingURL=build.js.map