class MovableObject{
    x = 20;
    y = 175;
    img;
    height = 150;
    width= 100
    imageChache = []
    currentImage = 0
    speed = 0.15;

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

    moveRight(){
        console.log('Moving right')
    }
    
    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
          }, 1000 / 60);
    }
}