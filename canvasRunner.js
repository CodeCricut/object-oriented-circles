"use strict";

setup();

function runDraw() {
    requestAnimationFrame(runDraw);
    draw();
}

requestAnimationFrame(runDraw);
