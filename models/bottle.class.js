class Bottle extends CollactableObject {
  offsetHeight = 20;
  offsetWidth = 60;
  offsetX = 30;
  offsetY = 10;

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
  }
}
