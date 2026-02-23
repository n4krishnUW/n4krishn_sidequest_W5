/*
Week 5 — Example 4: Circle Collector with Growing Player

Course: GBDA302 | Instructors: Dr. Karen Cochrane & David Han
Date: Feb. 12, 2026

Move: WASD/Arrows

Learning goals:
- Extend the JSON-driven world to include camera parameters
- Implement smooth camera follow using interpolation (lerp)
- Separate camera behavior from player/world logic
- Consume colorful circles to grow the player
- Reset game when player touches world edges
- Dynamic collision detection and object consumption
*/

const VIEW_W = 800;
const VIEW_H = 480;

let worldData;
let level;
let player;

let camX = 0;
let camY = 0;

function preload() {
  worldData = loadJSON("world.json"); // load JSON before setup [web:122]
}

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  textFont("sans-serif");
  textSize(14);

  level = new WorldLevel(worldData);

  const start = worldData.playerStart ?? { x: 300, y: 300, speed: 3 };
  player = new Player(start.x, start.y, start.speed);

  camX = player.x - width / 2;
  camY = player.y - height / 2;
}

function draw() {
  player.updateInput();

  // Check if player touches world edges (reset game)
  if (
    player.x <= 0 ||
    player.x >= level.w ||
    player.y <= 0 ||
    player.y >= level.h
  ) {
    resetGame();
    return;
  }

  // Check circle collisions
  for (const circle of level.circles) {
    if (circle.touchesPlayer(player)) {
      player.consumeCircle(circle);
      circle.consume();
    }
  }

  // Target camera (center on player)
  let targetX = player.x - width / 2;
  let targetY = player.y - height / 2;

  // Clamp target camera safely
  const maxCamX = max(0, level.w - width);
  const maxCamY = max(0, level.h - height);
  targetX = constrain(targetX, 0, maxCamX);
  targetY = constrain(targetY, 0, maxCamY);

  // Smooth follow using the JSON knob
  const camLerp = level.camLerp; // ← data-driven now
  camX = lerp(camX, targetX, camLerp);
  camY = lerp(camY, targetY, camLerp);

  level.drawBackground();

  push();
  translate(-camX, -camY);
  level.drawWorld();
  player.draw();
  pop();

  level.drawHUD(player, camX, camY);
}

function resetGame() {
  const start = worldData.playerStart ?? { x: 300, y: 300, speed: 3 };
  player.reset(start.x, start.y);
  level.resetCircles(worldData);
  camX = player.x - width / 2;
  camY = player.y - height / 2;
}

function keyPressed() {
  if (key === "r" || key === "R") {
    resetGame();
  }
}
