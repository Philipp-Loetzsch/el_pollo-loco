class Healing extends MovableObject {
  constructor(x, y) {
    super();
    this.x = x + 50;
    this.y = y + 100;
    this.width = 50;
    this.height = 60;
    this.loadImage("img/11_healing/heal_char.png");
    this.animate();
  }

  /**
   * Animates the healing object by moving it upwards and to the left.
   * After one second, it removes the healing object from the world.
   */
  animate() {
    let healing = setInterval(() => {
      this.x -= 2;
      this.y -= 2;
      setTimeout(() => {
        clearInterval(healing);
        world.healingObjects.splice(0, 1);
      }, 1000);
    }, 1000 / 30);
  }
}
