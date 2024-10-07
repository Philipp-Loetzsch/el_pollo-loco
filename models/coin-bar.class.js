class CoinBar extends Statusbar {
  IMAGE = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    super().loadImages(this.IMAGE);
    this.x = 0;
    this.y = 80;
    this.setPercentage(0);
    this.healing();

  }

  healing() {
    setInterval(() => {
      if (this.percentage == 100) {
        this.loadImage("img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png");
        setTimeout(() => {
            this.loadImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png");
        }, 200);
      }
      else if (this.percentage == 0){
        this.loadImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png")
      }
    }, 1000 / 2);
  }
}
