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
  alertCount = 0;
  firstAlert = false;
  enableAttack = true;

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
    this.x = this.level_end_x;
    this.animate();
  }

  animate() {
    this.movement()
    let boss = setInterval(() => {
      if (world && this.lastBattle) {
        this.bossFight();
        clearInterval(boss);
      }
    }, 1000 / 10);
    this.lastFight()
  }

  movement(){
    let mainAnimation = setInterval(() => {
      if (this.x <= this.level_end_x - 500) {
        this.leftEnd = true;
      } else if (this.x >= this.level_end_x) {
        this.leftEnd = false;
      }
      if (this.isDead()) {
        this.bossDied();
        clearInterval(mainAnimation);
      } else if (this.damage) {
        this.bossHurt();
        this.x += 40;
      } else if (!this.lastBattle) {
        this.bossWalking();
      }
    }, 1000 / 10);
  }

  bossDied() {
    this.currentImage = 0;
    this.endSceneFrame = 0;
    world.endbossBar.setPercentage(0);
    let hurtAnimation = setInterval(() => {
      this.playAnimation(this.IMAGES_HURT);
      this.playSound("bossHurtSound", 0.2);
      this.endSceneFrame++;
      if (this.endSceneFrame === this.IMAGES_HURT.length * 5) {
        clearInterval(hurtAnimation);
        this.endSceneFrame = 0;
        setInterval(() => {
          this.playAnimation(this.IMAGES_DEAD);
          this.playSound("bossDyingSound", 1);
          this.endSceneFrame++;
          if (this.endSceneFrame === this.IMAGES_DEAD.length) this.winGame();
        }, 200);
      }
    }, 100);
  }

  bossHurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.playSound("bossHurtSound", 0.2);
    setTimeout(() => {
      this.damage = false;
    }, this.IMAGES_HURT.length * 200);
    world.endbossBar.setPercentage(this.energy / 3);
  }

  bossWalking() {
    this.playAnimation(this.IMAGES_WALKING);

    if (!this.leftEnd) {
      this.moveLeft();
      this.otherDirection = false;
    } else if (this.leftEnd) {
      this.moveRight();
      this.otherDirection = true;
    }
  }

  lastFight(){
    setInterval(() => {
      if (!world) return;
      let length = world.level.enemies.length;
      if (world.character.x >= world.level.enemies[length - 1].x - 550 && !this.isDead()
      ) {
        world.endbossBar.y = 20;
        this.endFight();
      }
    }, 400);
  }

  endFight() {
    this.lastBattle = true;
    this.otherDirection = false;
  }

  alertBoss() {
    if (this.currentImage >= this.IMAGES_ALERT.length) {
      this.currentImage = 0;
      this.playSound("bossAlertSound", 0.2);
    }
    let alertAnimation = setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
      this.playSound("bossAttackSound", 0.2);
      if (this.currentImage >= this.IMAGES_ALERT.length) {
        this.playSound("bossHurtSound", 0.2);
        this.firstAlert = true;
        clearInterval(alertAnimation);
        this.bossFight();
      }
    }, 200);
  }

  bossFight() {
    if (!this.firstAlert) {
      this.alertBoss();
    } else {
      this.endbossWalking();
    }
  }

  endbossWalking() {
    setInterval(() => {
      if (this.enableBoss()) {
        this.speed = 10;
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
        this.playSound("bossWalkingSound", 0.5);
      } else if (this.lastBattle && !this.isDead() && !this.damage) {
        this.enableAttack = false;
        this.speed = 20;
        this.moveRight();
        this.playAnimation(this.IMAGES_ATTACK);
        this.playSound("bossAttackSound", 0.2);
        if (this.x >= world.character.x + 300) {
          this.enableAttack = true;
        }
      }
    }, 1000 / 10);
  }

  enableBoss() {
    return (
      world.character.x + world.character.width / 2 <= this.x &&
      this.lastBattle &&
      this.enableAttack &&
      !this.isDead() && 
      !this.damage
    );
  }

  winGame() {
    this.clearAllIntervals();
    setTimeout(() => {
      world.endGame("win");
      world_music.pause();
      if(!isMuted) this.playSound("winningTheme", 0.2);
    }, 1000);
  
  }
}
