class CollidingObject extends DrawableObject {
  
  checkCollisions() {
    setInterval(() => {
      world.level.enemies.forEach((enemie) => {
        if (world.character.isColliding(enemie)) {
          world.character.hit();
          world.healthBar.setPercentage(world.character.energy);
        }
      });
    }, 1000/ 60);
  }
}
