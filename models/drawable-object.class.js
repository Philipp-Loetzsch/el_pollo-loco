class DrawableObject {
  img;
  imageChache = [];
  currentImage = 0;
  x = -150;
  y = 180;
  offsetX = 0;
  offsetY = 0;
  offsetHeight = 0;
  offsetWidth = 0;
  level_end_x = 5000;
  angle = 0;

  /**
   * Loads an image from the specified path and assigns it to the img property.
   * @param {string} - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the loaded image onto the canvas at the specified coordinates.
   * @param {CanvasRenderingContext2D} - The rendering context for the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads multiple images from an array of paths and caches them for later use.
   * @param {string[]} - An array of image file paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageChache[path] = img; // Note: Ensure imageChache is defined in the class.
    });
  }

  drawFrame(ctx) {
    if (false) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect( this.x + this.offsetX, this.y + this.offsetY, this.width - this.offsetWidth, this.height - this.offsetHeight);
      ctx.stroke();
    }
  }
}
