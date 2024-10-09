class Bottle extends CollactableObject {
  offsetHeight = 20;
  offsetWidth = 60;
  offsetX = 30;
  offsetY = 10;
  height = 100;
  width = 100;

  IMAGE = [
    "img/6_salsa_bottle/salsa_bottle_angle_1.png",
    "img/6_salsa_bottle/salsa_bottle_angle_2.png",

  ]

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle_angle_1.png");
    this.loadImages(this.IMAGE)
    this.x = x;
    this.y = y;
    this.animate()
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGE);
    }, 1000 / 2);
  }

}
