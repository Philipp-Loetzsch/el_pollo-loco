class BackgroundObject extends MovableObject {
    width = canvas.width
    height = canvas.height
    constructor(imagePath, x){
        super().loadImage(imagePath)
        this.y = 480 - this.height;
        this.x = x;
    }
}
