class CoinBar extends Statusbar{
    percentage = 0;
    IMAGE = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
        
    ];

    constructor() {
        super();
        this.x = 0;
        this.y = 80;
        this.loadImages(this.IMAGE);
        this.setPercentage(0); 
    }
}