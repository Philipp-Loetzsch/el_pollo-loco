class Endboss extends MovableObject {
  height = 400;
  width = 300;
  y = 50;
  offsetY = 60;
  offsetWidth = 20;
  offsetX = 10;
  offsetHeight = 80;
  energy = 300;
  speed = 5;
  endSceneFrame = 0;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3000;
    this.animate();
  }

  animate() {
    const mainAnimation = setInterval(() => {
      if (this.x <= 2600) {
        this.leftEnd = true;
      } else if (this.x >= 4000) {
        this.leftEnd = false;
      }
      if (this.isDead()) {
        this.bossDied();
        clearInterval(mainAnimation);
      } else if (this.damage) {
        this.bossHurt()
      } else {
        this.bossWalking()
      }
    }, 1000 / 10);
  }

  bossDied() {
    this.currentImage = 0;
    this.endSceneFrame = 0;
    let hurtAnimation = setInterval(() => {
      this.playAnimation(this.IMAGES_HURT);
      this.endSceneFrame++;
      if (this.endSceneFrame === this.IMAGES_HURT.length* 5) {
        clearInterval(hurtAnimation);
        this.endSceneFrame = 0;
        let deathAnimation = setInterval(() => {
          this.playAnimation(this.IMAGES_DEAD);
          this.endSceneFrame++;
          if (this.endSceneFrame === this.IMAGES_DEAD.length) {
            clearInterval(deathAnimation);
          }
        }, 200);
      }
    }, 100);
  }

  bossHurt(){
    this.playAnimation(this.IMAGES_HURT);
    setTimeout(() => {
      this.damage = false;
    }, this.IMAGES_HURT.length * 200);
  }

  bossWalking(){
    this.playAnimation(this.IMAGES_WALKING);

    if (this.x >= 2600 && !this.leftEnd) {
      this.moveLeft();
      this.otherDirection = false;
    } else if (this.x <= 4000 && this.leftEnd) {
      this.moveRight();
      this.otherDirection = true;
    }
  }
}
