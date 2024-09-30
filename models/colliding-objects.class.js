class CollidingObject extends DrawableObject {
  fallingDown = false;
  

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y < 350;
    } else {
      return this.y < 180;
    }
  }

  checkCollisions() {
    setInterval(() => {
      world.level.enemies.forEach((enemie) => {
        if (this.isColliding(enemie)) {
          if (this.fallingDown) {
            this.attack(enemie);
          } else {
            this.hit(20);
            world.healthBar.setPercentage(world.character.energy);
          }
        }
      });
    }, 1000 / 60);
  }

  isColliding(obj) {
    return (
      this.x - this.offsetX + this.width >= obj.x + this.offsetX &&
      this.x + this.offsetX <= obj.x + obj.width &&
      this.y + this.offsetY + this.offsetHeight >=
        obj.y - obj.height / 2.5 + obj.offsetY &&
      this.y + this.offsetY <= obj.y + obj.height - obj.offsetHeight
    );
  }

  hit(damage) {
    if (this.isHurt()) return;
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  attack(enemie) {
    enemie.energy -= 100 ;
    enemie.offsetY += 80;
  }
}
