class Bottle extends CollidingObject {
    offsetHeight = 20;
    offsetWidth = 60;
    offsetX = 30;
    offsetY = 10;
    width = 80;
    height = 80;
    angle = 0; // Initialer Winkel
    direction = 1; // Richtung der Neigung (1 = vorwärts, -1 = rückwärts)
    maxAngle = 10; // Maximale Neigung in Grad

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.animateTilt(); // Starte die Animation
    }

    animateTilt() {
        setInterval(() => {
            this.angle += this.direction; // Winkel anpassen

            if (this.angle >= this.maxAngle || this.angle <= -this.maxAngle) {
                this.direction *= -1; // Richtung umkehren
            }
        }, 1000 / 60); // Aktualisierung bei ca. 60 FPS
    }
}
