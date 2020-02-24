"use strict";
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

let baseCircles = [];
let bounceCircles = [];
let rainbowCircles = [];
let breathingCircles = [];

function setup() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    // essentially turns off antialiasing
    // context.translate(0.5, 0.5)

    createCircles();
}

function draw() {
    clearCanvas();

    for (let circle of [
        ...baseCircles,
        ...bounceCircles,
        ...rainbowCircles,
        ...breathingCircles
    ]) {
        circle.draw();
    }
    for (let bounceCircle of [
        ...bounceCircles,
        ...rainbowCircles,
        ...breathingCircles
    ]) {
        bounceCircle.bounce();
    }
    for (let breathingCircle of [...breathingCircles]) {
        breathingCircle.breath();
    }
}

function clearCanvas() {
    context.clearRect(0, 0, innerWidth, innerHeight);
}

function createCircles() {
    for (let i = 0; i < 50; i++) {
        baseCircles.push(new Circle(generateRandValues()));
        bounceCircles.push(new BounceCircle(generateRandValues()));
        rainbowCircles.push(new RainbowCircle(generateRandValues()));
        breathingCircles.push(new BreathingCircle(generateRandValues()));
    }
}

function generateRandValues() {
    let x = randBetween(0, innerWidth);
    let y = randBetween(0, innerHeight);
    let r = randBetween(5, 50);
    let xSpeed = randBetween(0, 10);
    let ySpeed = randBetween(0, 10);
    let rMin = randBetween(5, r);
    let rMax = randBetween(r, 100);
    let rSpeed = randBetween(0, 5);
    let cStart = randBetween(0, 255);
    return { x, y, r, xSpeed, ySpeed, rMin, rMax, rSpeed, cStart };
}
