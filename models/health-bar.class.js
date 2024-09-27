class HealthBar extends Statusbar {
    HEALTH = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];

    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.loadImages(this.HEALTH); // Load the specific health images
        this.setPercentage(100); // Initialize with 100% health
    }

    // Override the getImages method to return the health images
    getImages() {
        return this.HEALTH;
    }
}