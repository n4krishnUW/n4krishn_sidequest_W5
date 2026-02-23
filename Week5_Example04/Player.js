class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.s = speed ?? 3;
    this.size = 24; // Initial size
    this.initialSize = 24;
    this.circlesConsumed = 0;
  }

  updateInput() {
    const dx =
      (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) -
      (keyIsDown(LEFT_ARROW) || keyIsDown(65));

    const dy =
      (keyIsDown(DOWN_ARROW) || keyIsDown(83)) -
      (keyIsDown(UP_ARROW) || keyIsDown(87));

    const len = max(1, abs(dx) + abs(dy));
    this.x += (dx / len) * this.s;
    this.y += (dy / len) * this.s;
  }

  consumeCircle(circle) {
    this.circlesConsumed++;
    // Grow by a portion of the circle's radius
    this.size += circle.r * 0.4;
    // Cap maximum size
    this.size = min(this.size, this.initialSize * 5);
  }

  reset(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = this.initialSize;
    this.circlesConsumed = 0;
  }

  draw() {
    fill(50, 110, 255);
    noStroke();
    rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size,
      5,
    );
  }
}
