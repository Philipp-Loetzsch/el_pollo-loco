class ThrowableObject extends MovableObject{
    constructor(x,y){
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png')
        this.x = x;
        this.y = y;
        this.width = 50
        this.height = 60
        this.throw()
    }

    throw(){
        this.speedY = 30;
        this.applyGravaty();
        setInterval(() => {
            this.x += 10
        }, 50);
    }
}