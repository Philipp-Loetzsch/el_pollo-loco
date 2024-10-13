class Statusbar extends DrawableObject {
  width = 150;
  height = 45;
  percentage = 100;

  /**
   * Sets the percentage value and updates the corresponding image based on the percentage.
   * @param {number} percentage - The new percentage value (0 to 100).
   */
  setPercentage(percentage) {
    if (percentage >= 100) percentage = 100;
    this.percentage = percentage;
    let path = this.IMAGE[this.resolveImageIndex()];
    this.img = this.imageChache[path];
  }

  /**
   * Resolves the index of the image based on the current percentage.
   * @returns {number} The index of the image corresponding to the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
