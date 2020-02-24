"use strict";

class Circle {
    constructor(circleValues) {
        this.x = circleValues.x;
        this.y = circleValues.y;
        this.r = circleValues.r;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
    }
}

class BounceCircle extends Circle {
    constructor(circleValues) {
        super(circleValues);
        this.xSpeed = circleValues.xSpeed;
        this.ySpeed = circleValues.ySpeed;
    }
    bounce() {
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
    }
}

class RainbowCircle extends BounceCircle {
    constructor(circleValues) {
        super(circleValues);
        this.red = circleValues.cStart;
        this.green = (circleValues.cStart + 10) % 255;
        this.blue = (circleValues.cStart + 60) % 255;

        this.redS = 1;
        this.greenS = 1;
        this.blueS = 1;
    }
    draw() {
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
    }
}

class BreathingCircle extends RainbowCircle {
    constructor(circleValues) {
        super(circleValues);
        this.rMin = circleValues.rMin;
        this.rMax = circleValues.rMax;
        this.rSpeed = circleValues.rSpeed;
    }
    breath() {
        if (this.r >= this.rMax || this.r <= this.rMin) this.rSpeed *= -1;
        this.r += this.rSpeed;
    }
}
