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
var forward = function () {
    line(0, 0, LINE_SIZE, 0);
    translate(LINE_SIZE, 0);
};
var pushGlobal = function () { return push(); };
var popGlobal = function () { return pop(); };
var turnRight = function () { return rotate(ANGLE); };
var turnLeft = function () { return rotate(-ANGLE); };
var ANGLE = (25.0 * (Math.PI * 2.0)) / 360.0;
var LINE_SIZE = 5.0;
var system = "X";
var RULES = {
    F: forward,
    "+": turnRight,
    "-": turnLeft,
    "[": pushGlobal,
    "]": popGlobal
};
var TRANSFORMS = {
    F: "FF",
    X: "F+[[X]-X]-F[-FX]+X"
};
var MAX_STEPS = 20;
var step = 0;
var executeRule = function (rule) {
    if (hasKey(RULES, rule)) {
        RULES[rule]();
    }
};
var expandRule = function (rule) {
    if (hasKey(TRANSFORMS, rule)) {
        return TRANSFORMS[rule];
    }
    else {
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
    var newSystem = "";
    for (var _i = 0, system_1 = system; _i < system_1.length; _i++) {
        var part = system_1[_i];
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
function hasKey(obj, key) {
    return key in obj;
}
//# sourceMappingURL=build.js.map