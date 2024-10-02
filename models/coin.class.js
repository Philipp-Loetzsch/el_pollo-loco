class Coin extends CollactableObject {
  offsetHeight = 50;
  offsetWidth = 50;
  offsetX = 25;
  offsetY = 25;

  IMAGE_BLINK = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGE_BLINK);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGE_BLINK);
    }, 1000 / 2);
  }
}
