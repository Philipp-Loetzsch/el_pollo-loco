class Character extends MovableObject {
  height = 250;
  width = 100;
  speed = 5;
  offsetX = 20;
  offsetY = 100;
  offsetHeight = 110;
  offsetWidth = 45;
  idleTime = 0;
  coinAmount = 0;
  bottleAmount = 0;
  deadFrame = 0;
  startJumping = false;
  noWayBack = -200;
  enableMove = true;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  world;
  walking_sound = new Audio("audio/running.mp3");
  hurt_sound = new Audio("audio/char_hit.mp3");
  healing_sound = new Audio("audio/heal_up.mp3")
  dying_sound = new Audio("audio/char_dye.mp3");
  gameOver_theme = new Audio("audio/gameover_theme.mp3")


  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.animate();
    this.applyGravaty();
    this.checkCollisions();
    this.checkCollactable();
    this.hurt_sound.volume = 0.4;
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      this.characterMovement();
      this.world.camera_x = -this.x + 50;
    }, 1000 / 60);

    setInterval(() => {
      this.InteractionAnimation();
      this.throwBottle();
      this.heal();
      let length = world.level.enemies.length;
      if (this.startLastBattle(length)) {
        this.enableMove = false;
        this.lastBattle = true;
        this.blockLeft();
        setTimeout(() => {
          this.enableMove = true;
        }, 2000);
      }
    }, 1000 / 10);

    setInterval(() => {
      if (
        !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
        !this.isAboveGround()
      )
        this.idleAnimation();
    }, 300);

    setInterval(() => {
      if (this.isAboveGround()) this.jumpAnimation();
    }, 50);
  }

  characterMovement() {
    if (this.enableMoveRight()) {
      this.moveRight();
      this.otherDirection = false;
      this.walking_sound.play();
    }
    if (this.enableMoveLeft()) {
      this.moveLeft();
      this.otherDirection = true;
      this.walking_sound.play();
      this.idleTime = 0;
    }
    if (this.enableJump()) {
      this.idleTime = 0;
      this.startJumping = true;
      this.jump(25);
    }
  }

  InteractionAnimation() {
    if (this.isDead()) {
      setInterval(() => {
        this.dying();
        this.dying_sound.play();
        this.deadFrame++;
        if (this.deadFrame >= this.IMAGES_DEAD.length) {
          this.clearAllIntervals();
          world.endGame("loose");
          world.world_music.pause()
          this.gameOver_theme.play();
          this.gameOver_theme.volume = 0.2
        }
      }, 500);
    } else if (this.isHurt()) {
      this.hurt_sound.play();
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isWalkung()) {
      this.playAnimation(this.IMAGES_WALKING);
      this.idleTime = 0;
    }
  }

  throwBottle() {
    if (this.enabelThrow()) {
      this.bottleAmount--;
      this.idleTime = 0;
      let bottle = new ThrowableObject(
        this.x + 50,
        this.y + 50,
        this.otherDirection
      );
      world.throwableObjects.push(bottle);
      this.currentThrow = true;
      world.bottleBar.percentage -= 20;
      world.bottleBar.setPercentage(world.bottleBar.percentage);
      setTimeout(() => {
        this.currentThrow = false;
      }, 1000);
    }
  }

  heal() {
    if (this.world.keyboard.H && this.energy < 100 && this.coinAmount == 5) {
      this.energy = 100;
      this.coinAmount = 0;
      world.coinBar.percentage -= 100;
      world.coinBar.setPercentage(world.coinBar.percentage);
      world.healthBar.setPercentage(this.energy);
      this.healing_sound.play()
    }
  }

  idleAnimation() {
    if (!this.idleTime) {
      this.idleTime = new Date().getTime();
    }
    if (this.longIdle() && this.enableMove) {
      return this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  jumpAnimation() {
    if (this.startJumping) {
      this.currentImage = 0;
      this.startJumping = false;
    } else if (this.speedY > 0) this.currentImage = 3;
    else if (this.speedY < -30 && this.y < 180) this.currentImage = 8;
    else if (this.speedY < -20 && this.y < 180) this.currentImage = 7;
    else if (this.speedY < -15 && this.y < 180) this.currentImage = 6;
    else if (this.speedY < -5 && this.y < 180) this.currentImage = 5;
    else if (this.speedY < 0 && this.y < 180) this.currentImage = 4;
    this.loadImage(this.IMAGES_JUMPING[this.currentImage]);
    this.playAnimation(this.IMAGES_JUMPING);
  }

  longIdle() {
    let longIdle = new Date().getTime() - this.idleTime;
    longIdle = longIdle / 1000;
    return longIdle > 5;
  }

  dying() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  enableMoveRight() {
    return (
      this.world.keyboard.RIGHT &&
      this.x < this.level_end_x &&
      !this.isDead() &&
      this.enableMove
    );
  }

  enableMoveLeft() {
    return (
      this.world.keyboard.LEFT &&
      this.x > -200 &&
      !this.isDead() &&
      this.x >= this.noWayBack
    );
  }

  enableJump() {
    return (
      this.world.keyboard.SPACE &&
      !this.isAboveGround() &&
      !this.isDead() &&
      this.enableMove
    );
  }

  isWalkung() {
    return (
      (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
      !this.isAboveGround() &&
      this.enableMove
    );
  }
  enabelThrow() {
    return (
      this.world.keyboard.D &&
      !this.currentThrow &&
      this.bottleAmount > 0 &&
      this.enableMove
    );
  }
  startLastBattle(length) {
    return (
      this.x >= world.level.enemies[length - 1].x - 500 &&
      !this.isDead() &&
      !this.lastBattle
    );
  }
  blockLeft() {
    if (this.lastBattle) this.noWayBack = this.x;
  }
}
