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
  }

  /**
   * Manages character animations and movement logic using intervals.
   */
  animate() {
    setInterval(() => {
      this.characterMovement();
      this.world.camera_x = -this.x + 50;
    }, 1000 / 60);
    setInterval(() => {
      this.InteractionAnimation();
      this.throwBottle();
      this.heal();
      this.endFigth();
      if (this.isAboveGround()) this.jumpAnimation();
    }, 1000 / 10);
    this.idle();
  }

  /**
   * Handles the start of the idle animation of character
   */
  idle(){
    setInterval(() => {
      this.pauseSound("snoringSound", 0);
      if (!(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()&& gameStart) {
        this.idleAnimation();
      }
    }, 300);
  }

  /**
   * Handles character movement and sound effects based on keyboard input.
   */
  characterMovement() {
    this.pauseSound("walkingSound", 0);
    if (this.enableMoveRight() || this.enableMoveLeft()) {
      this.enableMoveRight() ? this.moveRight(false) : this.moveLeft(true);
      if (!this.isAboveGround()) this.playSound("walkingSound", 1);
      this.idleTime = 0;
    }
    if (this.enableJump()) {
      this.idleTime = 0;
      this.startJumping = true;
      this.playSound("jumpSound", 0.1);
      this.jump(25);
    }
  }
  
  /**
   * Plays animations based on interactions (e.g., being hurt, walking).
   */
  InteractionAnimation() {
    if (this.isDead()) {
      setInterval(() => {
        this.dying();
        this.playSound("dyingSound", 0.5);
        this.deadFrame++;
        this.charIsDead();
      }, 500);
    } else if (this.isHurt()) {
      this.playSound("hurtSound", 0.3);
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isWalkung()) {
      this.playAnimation(this.IMAGES_WALKING);
      this.idleTime = 0;
    }
  }

  /**
   * Handles bottle throwing action.
   */
  throwBottle() {
    if (this.enabelThrow()) {
      this.bottleAmount--;
      this.idleTime = 0;
      let bottle = new ThrowableObject( this.x + 50, this.y + 50, this.otherDirection);
      world.throwableObjects.push(bottle);
      this.currentThrow = true;
      world.bottleBar.percentage -= 20;
      world.bottleBar.setPercentage(world.bottleBar.percentage);
      setTimeout(() => {
        this.currentThrow = false;
      }, 1000);
    }
  }

  /**
   * Heals the character when conditions are met.
   */
  heal() {
    if (this.world.keyboard.H && this.energy < 100 && this.coinAmount == 5) {
      this.energy = 100;
      this.coinAmount = 0;
      world.coinBar.percentage -= 100;
      world.coinBar.setPercentage(world.coinBar.percentage);
      world.healthBar.setPercentage(this.energy);
      this.playSound("healingSound", 0.6);
      let healChar = new Healing(this.x, this.y);
      this.world.healingObjects.push(healChar);
    }
  }

  /**
   * Plays idle or long idle animations based on idle time.
   */
  idleAnimation() {
    if (!this.idleTime) {
      this.idleTime = new Date().getTime();
    }
    if (this.longIdle() && this.enableMove) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      this.playSound("snoringSound", 0.5);
      return;
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Plays the jumping animation based on speed and position.
   */
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

  /**
   * Checks if the character has been idle for a long time.
   * @returns {boolean} - True if idle for more than 5 seconds.
   */
  longIdle() {
    let longIdle = new Date().getTime() - this.idleTime;
    longIdle = longIdle / 1000;
    return longIdle > 5;
  }

  /**
   * Plays the death animation.
   */
  dying() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  /**
   * Checks if the character can move to the right.
   * @returns {boolean} - True if allowed to move right.
   */
  enableMoveRight() {
    return (
      this.world.keyboard.RIGHT &&
      this.x < this.level_end_x &&
      !this.isDead() &&
      this.enableMove
    );
  }

  /**
   * Checks if the character can move to the left.
   * @returns {boolean} - True if allowed to move left.
   */
  enableMoveLeft() {
    return (
      this.world.keyboard.LEFT &&
      this.x > -200 &&
      !this.isDead() &&
      this.x >= this.noWayBack
    );
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} - True if allowed to jump.
   */
  enableJump() {
    return (this.world.keyboard.SPACE &&  !this.isAboveGround() &&  !this.isDead() &&  this.enableMove);
  }

  /**
   * Determines if the character is walking.
   * @returns {boolean} - True if moving left or right.
   */
  isWalkung() {
    return (
      (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
      !this.isAboveGround() &&
      this.enableMove
    );
  }

  /**
   * Checks if the character can throw a bottle.
   * @returns {boolean} - True if throwing is allowed.
   */
  enabelThrow() {
    return (
      this.world.keyboard.D &&
      !this.currentThrow &&
      this.bottleAmount > 0 &&
      this.enableMove
    );
  }

  /**
   * Starts the final battle if conditions are met.
   * @param {number} length - Total number of enemies.
   * @returns {boolean} - True if final battle is starting.
   */
  startLastBattle(length) {
    return (
      this.x >= world.level.enemies[length - 1].x - 500 &&
      !this.isDead() &&
      !this.lastBattle
    );
  }

  /**
   * Blocks movement to the left when the final battle starts.
   */
  blockLeft() {
    if (this.lastBattle) this.noWayBack = this.x;
  }

  /**
   * Manages the start and end of the final battle.
   */
  endFigth() {
    let length = world.level.enemies.length;
    if (this.startLastBattle(length)) {
      this.enableMove = false;
      this.lastBattle = true;
      this.blockLeft();
      setTimeout(() => {
        this.enableMove = true;
      }, 2000);
    }
  }

  /**
   * Handles character death, stopping all animations and ending the game.
   */
  charIsDead() {
    if (this.deadFrame >= this.IMAGES_DEAD.length) {
      clearAllIntervals();
      endGame("loose");
      world_music.pause();
    }
  }
}
