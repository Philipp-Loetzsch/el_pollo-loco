class CollidingObject extends DrawableObject {
  fallingDown = false;
  lastAttack = false;
  collect = false;
  

  isAboveGround() {
    if (this instanceof ThrowableObject || this instanceof ChickenSmall) {
      return this.y < 350;
    } else {
      return this.y < 180;
    }
  }

  applyGravaty() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.speedY < 0 && this.isAboveGround()) {
          this.fallingDown = true;
        } else {
          this.fallingDown = false;
        }
      }
    }, 1000 / 25);
  }

  checkCollisions() {
    setInterval(() => {
      world.level.enemies.forEach((enemie) => {
        if (this.isColliding(enemie)) {
          if (this.isAttack(enemie)) {
            this.attack(enemie);
          } else{
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

  isAttack(enemie) {
    return (
      (this.fallingDown && this.y + this.offsetHeight < enemie.y) ||
      this instanceof ThrowableObject
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
    if ((!this.lastAttack && !enemie.damage) || this instanceof Character) {
      enemie.damage = true;
      enemie.energy -= 100;
      enemie.offsetY += 120;
      if (enemie.energy <= 0) {
        enemie.energy = 0;
      }
      this.lastAttack = true;
    }
  }
  checkCollactable() {
    setInterval(() => {
      world.level.collectableObjects.forEach((co) => {
        if (this.isColliding(co) && !this.collect) {
          if (co instanceof Coin && this.coinAmount < 5) {
            this.removeItem(co);
            world.coinBar.percentage += 20;
            world.coinBar.setPercentage(world.coinBar.percentage);
            this.coinAmount ++           
          } else if (co instanceof Bottle && this.bottleAmount < 5) {
            this.removeItem(co);
            world.bottleBar.percentage += 20;
            world.bottleBar.setPercentage(world.bottleBar.percentage);
            this.bottleAmount ++
          }
        }
      });
    }, 1000 / 60);
  }

  removeItem(co) {
    let index = world.level.collectableObjects.indexOf(co);
    if (index > -1) {
      world.level.collectableObjects.splice(index, 1);
    }
  }
  removeEnemie(enemie){
    let index = world.level.enemies.indexOf(enemie);
    if (index > -1) {
      world.level.enemies.splice(index, 1);
    }
  }
  removeThrownObject(to){
    let index = world.throwableObjects.indexOf(to);
    if (index > -1) {
      world.throwableObjects.splice(index, 1);
    }
  }
}
