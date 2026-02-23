class Circle {
  constructor(x, y, r, colorHex) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.baseR = r; // Store base radius for breathing effect
    this.colorHex = colorHex;
    this.active = true;

    // Breathing animation
    this.breathPhase = random(TWO_PI); // Random starting phase
    this.breathSpeed = 0.05;
    this.breathAmount = 0.15; // 15% size variation
  }

  update() {
    if (!this.active) return;

    // Update breathing animation
    this.breathPhase += this.breathSpeed;
    const breathScale = 1 + sin(this.breathPhase) * this.breathAmount;
    this.r = this.baseR * breathScale;
  }

  draw() {
    if (!this.active) return;

    fill(this.colorHex);
    noStroke();
    circle(this.x, this.y, this.r * 2);
  }

  // Check if player touches this circle
  touchesPlayer(player) {
    if (!this.active) return false;
    const d = dist(this.x, this.y, player.x, player.y);
    return d < this.r + player.size / 2;
  }

  // Called when consumed
  consume() {
    this.active = false;
  }
}
