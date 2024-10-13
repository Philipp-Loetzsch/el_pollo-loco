class CollidingObject extends AudioObjects {
  fallingDown = false;
  lastAttack = false;
  collect = false;

   /**
   * Checks if the object is above the ground based on its type.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
   isAboveGround() {
    if (this instanceof ThrowableObject || this instanceof ChickenSmall) {
      return this.y < 350;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Applies gravity to the object, updating its vertical position based on its speed.
   * Sets the fallingDown flag based on the object's position and speed.
   */
  applyGravaty() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        this.fallingDown = this.speedY < 0 && this.isAboveGround();
      }
    }, 1000 / 25);
  }

  /**
   * Checks for collisions with enemies and applies damage or attacks accordingly.
   */
  checkCollisions() {
    setInterval(() => {
      world.level.enemies.forEach((enemie) => {
        if (this.isColliding(enemie)) {
          if (this.isAttack(enemie)) {
            this.attack(enemie);
          } else {
            this.hit(20);
            world.healthBar.setPercentage(world.character.energy);
          }
        }
      });
    }, 1000 / 20);
  }

  /**
   * Checks if this object is colliding with another object.
   * @param {Object} obj - The object to check for collision.
   * @returns {boolean} True if there is a collision, false otherwise.
   */
  isColliding(obj) {
    return (
      this.x - this.offsetX + this.width >= obj.x + this.offsetX &&
      this.x + this.offsetX <= obj.x + obj.width &&
      this.y + this.offsetY + this.offsetHeight >=
        obj.y - obj.height / 2.5 + obj.offsetY &&
      this.y + this.offsetY <= obj.y + obj.height - obj.offsetHeight
    );
  }

  /**
   * Checks if this object can attack the given enemy.
   * @param {Object} enemie - The enemy to check against.
   * @returns {boolean} True if the object can attack, false otherwise.
   */
  isAttack(enemie) {
    return (
      (this.fallingDown && this.y + this.offsetHeight < enemie.y) ||
      this instanceof ThrowableObject
    );
  }

  /**
   * Applies damage to the object and checks if it has been hurt.
   * @param {number} damage - The amount of damage to apply.
   */
  hit(damage) {
    if (this.isHurt()) return;
    this.energy -= damage;
    this.energy = Math.max(this.energy, 0);
    if (this.energy > 0) {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently hurt based on the time since the last hit.
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    const timepassed = (new Date().getTime() - this.lastHit) / 1000;
    return timepassed < 1;
  }

  /**
   * Attacks the given enemy, dealing damage if conditions are met.
   * @param {Object} enemie - The enemy to attack.
   */
  attack(enemie) {
    if ((!this.lastAttack && !enemie.damage) || this instanceof Character) {
      enemie.damage = true;
      enemie.energy -= 100;
      enemie.offsetY += 120;
      enemie.energy = Math.max(enemie.energy, 0);
      this.lastAttack = true;
    }
  }

  /**
   * Checks for collectible items and collects them if the conditions are met.
   */
  checkCollactable() {
    setInterval(() => {
      world.level.collectableObjects.forEach((co) => {
        if (this.isColliding(co) && !this.collect) {
          if (co instanceof Coin && this.coinAmount < 5) {
            this.removeItem(co);
            world.coinBar.percentage += 20;
            world.coinBar.setPercentage(world.coinBar.percentage);
            this.coinAmount++;
            this.playSound("collectCoin", 0.2);
          } else if (co instanceof Bottle && this.bottleAmount < 5) {
            this.removeItem(co);
            world.bottleBar.percentage += 20;
            world.bottleBar.setPercentage(world.bottleBar.percentage);
            this.bottleAmount++;
            this.playSound("collectBottle", 1);
          }
        }
      });
    }, 1000 / 60);
  }

  /**
   * Removes a collectible item from the level.
   * @param {Object} co - The collectible item to remove.
   */
  removeItem(co) {
    const index = world.level.collectableObjects.indexOf(co);
    if (index > -1) {
      world.level.collectableObjects.splice(index, 1);
    }
  }

  /**
   * Removes an enemy from the level.
   * @param {Object} enemie - The enemy to remove.
   */
  removeEnemie(enemie) {
    const index = world.level.enemies.indexOf(enemie);
    if (index > -1) {
      world.level.enemies.splice(index, 1);
    }
  }

  /**
   * Removes a thrown object from the world.
   * @param {Object} to - The thrown object to remove.
   */
  removeThrownObject(to) {
    const index = world.throwableObjects.indexOf(to);
    if (index > -1) {
      world.throwableObjects.splice(index, 1);
    }
  }
}