class CollactableObject extends MovableObject {
    width = 80
    height = 80
    constructor(){
        super().loadImage('img/8_coin/coin_1.png')
        this.y =  50 + Math.random() * 80;
        this.x = 200 + Math.random() * 1500;
    }
}
