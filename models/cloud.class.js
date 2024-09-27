class Cloud extends MovableObject {
  y = 20;
  width = 300;
  height = 250;

  constructor(x) {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500 + x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
   
  }

}
