class MovableObject extends CollidingObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;
  leftEnd = false;
  rightEnd = false;
  damage = false;
  currentThrow = false;
  spawnPoint = 0;
  lastBattle = false;

  /**
   * Checks if the object is dead based on its energy.
   * @returns {boolean} True if the object's energy is 0, false otherwise.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Plays the next frame of the animation from the provided images array.
   * @param {Array<string>} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageChache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight(od) {
    this.otherDirection = od;
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft(od) {
    this.otherDirection = od;
    this.x -= this.speed;
  }

  /**
   * Sets the upward speed of the object for jumping.
   * @param {number} height - The height to jump.
   */
  jump(height) {
    this.speedY = height;
  }

  /**
   * Clears all intervals set in the window.
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }
}
