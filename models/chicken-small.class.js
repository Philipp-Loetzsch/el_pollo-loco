class ChickenSmall extends MovableObject {
  height = 60;
  width = 45;
  y = 365;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * x;
    this.spawnPoint = this.x;
    this.animate();
    this.applyGravaty();
  }

  /**
   * Controls the animation logic for the small chicken, including movement, jumping, and dying behaviors.
   */
  animate() {
    this.speed = 0.15 + Math.random() * 1.25;
    this.movement();
    this.jumpingChicken();
    this.dyingChickenSmall();
  }

  /**
   * Manages the movement of the small chicken, making it move left or right within a specified range.
   */
  movement() {
    setInterval(() => {
      if (this.x <= this.spawnPoint - 500 || this.x <= 0) {
        this.leftEnd = true;
      } else if (this.x >= this.spawnPoint + 500) {
        this.leftEnd = false;
      }
      if (!this.leftEnd && this.energy == 100) {
        this.moveLeft(false);
      } else if (this.energy == 100) {
        this.moveRight(true);
      }
    }, 1000 / 60);
  }

  /**
   * Makes the small chicken jump randomly when it is on the ground and alive.
   */
  jumpingChicken() {
    setInterval(() => {
      if (!this.isAboveGround() && !this.isDead()) {
        this.jump(20 * Math.random());
      }
    }, 2000 * Math.random());
  }

  /**
   * Handles the small chicken's death animation and removal, playing a sound and stopping movement.
   */
  dyingChickenSmall() {
    let deadChicken = setInterval(() => {
      if (this.isDead()) {
        this.playSound("killChickenSmall", 0.2);
        this.offsetY = 500;
        this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
        clearInterval(deadChicken);
        setTimeout(() => {
          this.removeEnemie(this);
        }, 2000);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 10);
  }
}
