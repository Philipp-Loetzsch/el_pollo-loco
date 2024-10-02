class Chicken extends MovableObject {
  height = 90;
  width = 55; 
  y = 335;
  killChickenAudio = new Audio("audio/kill_chicken.mp3") 

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.spawnPoint = this.x;
    this.animate();
    this.killChickenAudio.volume = 0.3
  }

  animate() {
    this.speed = 0.15 + Math.random() * 1.25;

    setInterval(() => {
      if (this.x <= this.spawnPoint - 500 || this.x <= 0) {
        this.leftEnd = true;
      } else if (
        this.x >= this.spawnPoint + 500) {
        this.leftEnd = false;
      }
      if (!this.leftEnd && this.energy == 100) {
        this.moveLeft();
        this.otherDirection = false;
      } else if (this.energy == 100) {
        this.moveRight();
        this.otherDirection = true;
      }
    }, 1000 / 60);

    let deadChicken = setInterval(() => {
      if (this.isDead()) {
        this.killChickenAudio.play()
        this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
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
