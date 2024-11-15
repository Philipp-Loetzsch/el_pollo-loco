class ThrowableObject extends MovableObject {
  splashFrame = 0;
  offsetHeight = 20;
  offsetWidth = 20;
  offsetX = 10;
  offsetY = 10;
  rotateInterval;

  IMAGE_ROTATE = [
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_SPLASH = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates an instance of ThrowableObject.
   * @param {number} x - The x-coordinate of the object.
   * @param {number} y - The y-coordinate of the object.
   * @param {boolean} oD - The direction of the throw (true for left, false for right).
   */
  constructor(x, y, oD) {
      super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
      this.loadImages(this.IMAGE_ROTATE);
      this.loadImages(this.IMAGE_SPLASH);
      this.x = x;
      this.y = y;
      this.width = 50;
      this.height = 60;
      this.throw(oD);
  }

  /**
   * Throws the object in the specified direction.
   * @param {boolean} oD - The direction of the throw (true for left, false for right).
   */
  throw(oD) {
      this.speedY = 20;
      this.applyGravaty();
      this.checkCollisions();
      this.splashBottle();
      this.rotateInterval = setInterval(() => {
          if (oD) {
              this.x -= 15;
          } else {
              this.x += 15;
          }
          this.rotate();
      }, 1000 / 20);
  }

  /**
   * Rotates the object while it is thrown.
   */
  rotate() {
      this.playAnimation(this.IMAGE_ROTATE);
      this.playSound("spinningSound", 0.15);
  }

  /**
   * Checks the position of the bottle and triggers the splash effect when it reaches the ground.
   */
  splashBottle() {
      let checkPosition = setInterval(() => {
          if (this.y >= 350 || this.lastAttack) {
              this.playSound("splashSound", 0.15);
              this.fallingDown = false;
              this.offsetY += 200;
              this.currentImage = 0;
              clearInterval(this.rotateInterval);
              let splashBottle = setInterval(() => {
                  this.x += 0;
                  this.splash(splashBottle);
                  this.splashFrame++;
              }, 50);
              clearInterval(checkPosition);
          }
      }, 100);
  }

  /**
   * Plays the splash animation and removes the object after the animation finishes.
   * @param {number} splashBottle - The interval ID of the splash animation.
   */
  splash(splashBottle) {
      if (this.splashFrame === this.IMAGE_SPLASH.length - 1) {
          clearInterval(splashBottle);
          setTimeout(() => {
              this.removeThrownObject(this);
          }, 500);
      }
      this.playAnimation(this.IMAGE_SPLASH);
  }
}
