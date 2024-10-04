class EndbossBar extends Statusbar {
    IMAGE = [
        "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",        
        "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",        
        "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",        
        "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",        
        "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",        
        "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",        
    ];

  constructor() {
    super().loadImages(this.IMAGE);
    this.x = 500
    this.y = -200
    this.setPercentage(100)
  }
}
