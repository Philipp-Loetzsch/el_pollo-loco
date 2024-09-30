class ThrowableObject extends MovableObject {
  splashFrame = 0
  offsetHeight = 20
  offsetWidth = 20
  offsetX = 10
  offsetY = 10
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
    this.checkCollisions()
    let rotateInterval;
    
    
    let checkPosition = setInterval(() => {
      if (this.y >= 350) {
        this.fallingDown = false
        this.currentImage = 0
        clearInterval(rotateInterval);       
        this.splash();        
        let splashBottle = setInterval(() => {
        
          this.x += 0; 
          this.splash();  
          this.splashFrame ++
          if (this.splashFrame === this.IMAGE_SPLASH.length - 1) {
            clearInterval(splashBottle)
          }
        }, 50);
        clearInterval(checkPosition);
      }
    }, 100);
    rotateInterval = setInterval(() => {
      this.x += 5;
      this.rotate();
    }, 1000 / 20);
  }

  rotate() {
    this.playAnimation(this.IMAGE_ROTATE);
  }

  splash() {
     this.playAnimation(this.IMAGE_SPLASH);   
  }
}
