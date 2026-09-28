const r = require("raylib");

const windowWidth = 1200;
const windowHeight = 700;
const topX = 0;

let ufoX = 850;
const ufoY = 200;
const ufoRadius = 150;
const ufoRadiusVertical = 50;
const ufoSpeed = 3;
let speed = ufoSpeed;

let alienX = 50;
const alienY = 500;
const alienFaceRadiusH = 40;
const alienFaceRadiusV = 35;
const alienBodyRadiusH = 25;
const alienBodyRadiusV = 30;
const alienEyeRadiusH = 10;
const alienEyeRadiusV = 15;
let alienEye1X = 35;
let alienEye2X = 65;
const alienSpeed = 3;
let aSpeed = alienSpeed;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, "myWindow");
    r.SetTargetFPS(60);
}

function update() {
    ufoX += calcUFOSpeed();
    alienX += calcAlienSpeed();
    alienEye1X += calcAlienEyeSpeed(alienEye1X);
    alienEye2X += calcAlienEyeSpeed(alienEye2X);
}

function calcUFOSpeed() {
    if (ufoX >= windowWidth - ufoRadius) speed = -ufoSpeed;
    if (ufoX <= topX + ufoRadius) speed = ufoSpeed;
    return speed;
}

// function calcAlienSpeed() {
//     aSpeed = alienSpeed;
//     if ((alienX >= windowWidth - alienFaceRadiusH) || (alienX <= topX + alienFaceRadiusH))
//         aSpeed *= -alienSpeed;
//     return aSpeed;
// }

function isThingOutOfBounds(start, width) {
    return (start + width > r.GetScreenWidth() || start < 0);
}

function calcAlienSpeed() {
    if (alienX >= windowWidth - alienFaceRadiusH) aSpeed = -alienSpeed;
    // (isThingOutOfBounds(alienX, alienFaceRadiusH)) ? -aSpeed : aSpeed;
    if (alienX <= topX + alienFaceRadiusH) aSpeed = alienSpeed;
    return aSpeed;
}

function calcAlienEyeSpeed(eye) {
    if (eye >= windowWidth - alienEyeRadiusH) aSpeed = -alienSpeed;
    if (eye <= topX + alienEyeRadiusH) aSpeed = alienSpeed;
    return aSpeed;
}

function isOverlap(start1, end1, start2, end2) {
    return start1 <= end2 && end1 >= start2;
}

function selectColor() {
    return isOverlap(ufoX - 149, ufoX + 151, alienX, alienX + alienFaceRadiusH) ? r.RED : r.WHITE;
}

function drawUFO() {
    r.DrawCircle(ufoX, ufoY - 30, ufoRadius / 2, selectColor());
    r.DrawEllipse(ufoX, ufoY, ufoRadius, ufoRadiusVertical, r.SKYBLUE);
    r.DrawLine(ufoX - 50, ufoY, ufoX - 150, ufoY + 400, selectColor());
    r.DrawLine(ufoX - 48, ufoY, ufoX - 148, ufoY + 400, selectColor());
    r.DrawLine(ufoX + 50, ufoY, ufoX + 150, ufoY + 400, selectColor());
    r.DrawLine(ufoX + 52, ufoY, ufoX + 152, ufoY + 400, selectColor());
}

function drawAlien() {
    r.DrawEllipse(alienX, alienY, alienFaceRadiusH, alienFaceRadiusV, r.GREEN);
    r.DrawEllipse(alienX, alienY + 50, alienBodyRadiusH, alienBodyRadiusV, r.GREEN);
    r.DrawEllipse(alienEye1X, alienY, alienEyeRadiusH, alienEyeRadiusV, r.BLACK);
    r.DrawEllipse(alienEye2X, alienY, alienEyeRadiusH, alienEyeRadiusV, r.BLACK);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.DARKBLUE);
    drawUFO();
    drawAlien();
    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};