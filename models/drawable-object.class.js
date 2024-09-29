class DrawableObject {
  img;
  imageChache = [];
  currentImage = 0;
  x = -150;
  y= 180 
  offsetX = 0;
  offsetY = 0;
  offsetHeight = 0
  offsetWidth = 0

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  } else {
      return console.error("Image not available for drawing:", this.img);
      
  }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageChache[path] = img;
    });
  }
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollactableObject) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x + this.offsetX, this.y + this.offsetY , this.width - this.offsetWidth, this.height - this.offsetHeight);
      ctx.stroke();
    }
  }

}
