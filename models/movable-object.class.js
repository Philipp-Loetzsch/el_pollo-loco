class MovableObject{
    x = 20;
    y = 175;
    img;
    height = 150;
    width= 100
    imageChache = []
    currentImage = 0
    speed = 0.15;
    otherDirection = false

    loadImage(path){
        this.img = new Image();
        this.img.src = path
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageChache[path]= img;
        });
      
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageChache[path];
        this.currentImage++;
    }

    moveRight(){
        setInterval(() => {
            if (this.x < 700) {
            this.x += this.speed;
            }
          }, 1000 / 60);
    }
    
    moveLeft(){
        setInterval(() => {
            if (this.x > 0) {
            this.x -= this.speed;
            }
          }, 1000 / 60);
    }
}