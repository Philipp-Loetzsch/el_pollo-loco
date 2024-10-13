class Cloud extends MovableObject {
  y = 20;
  width = 300;
  height = 250;

  constructor(x) {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500 + x;
    this.spawnPoint = this.x
    this.animate();
  }

 /**
 * Continuously moves the object to the left and resets its position to the spawn point if it goes off-screen.
 */
animate() {
  setInterval(() => {
    this.moveLeft();
    if (this.x <= -500) {
      this.x = this.spawnPoint;
    }
  }, 1000 / 60);
}

}
