class ThrowableObject extends MovableObject {
  IMAGE_ROTATE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage("img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.loadImages(this.IMAGE_ROTATE);
    this.loadImages(this.IMAGE_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.throw();
  }

  throw() {
    this.speedY = 20;
    this.applyGravaty();

    let splasObject = setInterval(() => {
      if (this.y >= 350) {
        this.x += 0;
        this.splash();
        clearInterval(splasObject)
      } else {
        this.x += 20;
        this.rotate();
      }
    }, 1000 / 15);
  }

  rotate() {
        this.playAnimation(this.IMAGE_ROTATE);
  }

  splash() {
       this.playAnimation(this.IMAGE_SPLASH); 
  }
}
