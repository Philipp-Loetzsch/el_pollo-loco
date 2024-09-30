class Chicken extends MovableObject {
  height = 70;
  width = 45;
  y = 365;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  

  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 500;
    this.animate();
    
  }

  animate() {
    this.speed = 0.15 + Math.random() * 1.25;
    setInterval(() => {
      if (this.x > 0 && this.energy == 100) {
        this.moveLeft();
      }
    }, 1000 / 60); 
    
    let deadChicken = setInterval(() => {
      if (this.isDead()) {
        this.loadImage('../img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        clearInterval(deadChicken)
      }
      else{
        this.playAnimation(this.IMAGES_WALKING);
      }
     
    }, 1000 / 10);
  }
}
