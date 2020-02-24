"use strict";
// read more about classical inheritance here: https://eli.thegreenplace.net/2013/10/22/classical-inheritance-in-javascript-es5

//                                                      BASE CIRCLE
function Circle(circleValues) {
    this.x = circleValues.x;
    this.y = circleValues.y;
    this.r = circleValues.r;
}

Circle.prototype.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
};

//                                                      BOUNCE CIRCLE

function BounceCircle(circleValues) {
    // Call constructor of superclass to initialize superclass-derived members.
    Circle.call(this, circleValues);

    // Initialize subclass's own members
    this.xSpeed = circleValues.xSpeed;
    this.ySpeed = circleValues.ySpeed;
}

// derives from Circle
BounceCircle.prototype = Object.create(Circle.prototype); // some say this is better than new Circle. IDK
BounceCircle.prototype.constructor = BounceCircle;

// add custom methods
BounceCircle.prototype.bounce = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x >= innerWidth - this.r) {
        this.xSpeed = -Math.abs(this.xSpeed);
    } else if (this.x <= this.r) {
        this.xSpeed = Math.abs(this.xSpeed);
    }
    if (this.y >= innerHeight - this.r) {
        this.ySpeed = -Math.abs(this.ySpeed);
    } else if (this.y <= this.r) {
        this.ySpeed = Math.abs(this.ySpeed);
    }
};

//                                                      RAINBOW CIRCLE

function RainbowCircle(circleValues) {
    BounceCircle.call(this, circleValues);

    this.red = circleValues.cStart;
    this.green = (circleValues.cStart + 10) % 255;
    this.blue = (circleValues.cStart + 60) % 255;

    this.redS = 1;
    this.greenS = 1;
    this.blueS = 1;
}
RainbowCircle.prototype = Object.create(BounceCircle.prototype);
RainbowCircle.prototype.constructor = RainbowCircle;

// override parents draw function
RainbowCircle.prototype.draw = function() {
    this.red += this.redS;
    this.green += this.greenS;
    this.blue += this.blueS;
    if (this.red >= 255 || this.red <= 0) this.redS *= -1;
    if (this.green >= 255 || this.green <= 0) this.greenS *= -1;
    if (this.blue >= 255 || this.blue <= 0) this.blueS *= -1;

    context.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;

    Circle.prototype.draw.call(this);

    context.fill();
    context.fillStyle = "000";
};

//                                                      BREATHING CIRCLE

function BreathingCircle(circleValues) {
    RainbowCircle.call(this, circleValues);
    this.rMin = circleValues.rMin;
    this.rMax = circleValues.rMax;
    this.rSpeed = circleValues.rSpeed;
}

BreathingCircle.prototype = Object.create(RainbowCircle.prototype);
RainbowCircle.prototype.constructor = BreathingCircle;

BreathingCircle.prototype.breath = function() {
    if (this.r >= this.rMax || this.r <= this.rMin) this.rSpeed *= -1;
    this.r += this.rSpeed;
};
