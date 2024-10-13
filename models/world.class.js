class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new HealthBar();
  bottleBar = new BottleBar();
  coinBar = new CoinBar();
  endbossBar = new EndbossBar();
  throwableObjects = [];
  healingObjects = [];
  collidingObject = new CollidingObject();

  /**
   * Creates an instance of the World.
   * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn.
   * @param {Keyboard} keyboard - The keyboard object for handling user input.
   */
  constructor(canvas, keyboard) {
      this.ctx = canvas.getContext("2d");
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.drawWorld();
      this.setWorld();
  }

  /**
   * Sets the world reference for the character.
   */
  setWorld() {
      this.character.world = this;
  }

  /**
   * Draws the entire world, including all movable objects and status bars.
   */
  drawWorld() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addAllMovableObjects();
      this.ctx.translate(-this.camera_x, 0);
      this.addStatusbar();
      let self = this;
      requestAnimationFrame(function () {
          self.drawWorld();
      });
  }

  /**
   * Adds all movable objects to the world for rendering.
   */
  addAllMovableObjects() {
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.level.collectableObjects);
      this.addObjectsToMap(this.throwableObjects);
      this.addObjectsToMap(this.healingObjects);
  }

  /**
   * Adds the status bars to the world for rendering.
   */
  addStatusbar() {
      this.addToMap(this.healthBar);
      this.addToMap(this.bottleBar);
      this.addToMap(this.coinBar);
      this.addToMap(this.endbossBar);
  }

  /**
   * Adds an array of objects to the map for rendering.
   * @param {Array<MovableObject>} objects - The objects to add to the map.
   */
  addObjectsToMap(objects) {
      objects.forEach((o) => {
          this.addToMap(o);
      });
  }

  /**
   * Adds a single movable object to the map for rendering.
   * @param {MovableObject} mo - The movable object to add.
   */
  addToMap(mo) {
      if (mo.otherDirection) {
          this.flipImage(mo);
      }
      mo.draw(this.ctx);
      mo.drawFrame(this.ctx);
      if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips the image of a movable object horizontally for rendering.
   * @param {MovableObject} mo - The movable object to flip.
   */
  flipImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
  }

  /**
   * Restores the original position of a flipped movable object after rendering.
   * @param {MovableObject} mo - The movable object to restore.
   */
  flipImageBack(mo) {
      mo.x = mo.x * -1;
      this.ctx.restore();
  }

  /**
   * Handles the end of the game and displays the appropriate ending screen.
   * @param {string} ending - The type of ending ("win" or "lose").
   */
  endGame(ending) {
      let endGame = document.getElementById("gameEnd");
      endGame.classList.add("game-ending");
      let imageEnding = endGame.querySelector("img");
      if (ending == "win") {
          imageEnding.src = "./img/9_intro_outro_screens/win/win_2.png";
      } else {
          imageEnding.src = "./img/9_intro_outro_screens/game_over/oh no you lost!.png";
      }
  }
}
