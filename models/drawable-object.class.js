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
  level_end_x = 5000;
  angle = 0

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageChache[path] = img;
    });
  }
  drawFrame(ctx) {
    if (false) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x + this.offsetX, this.y + this.offsetY , this.width - this.offsetWidth, this.height - this.offsetHeight);
      ctx.stroke();
    }
  }

}
