class CollidingObjects{

    checkThrowObjects(){
        if (this.keyboard.D) {
          let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
          this.throwableObjects.push(bottle)
        }
      }
    
      checkCollisions(){
        this.level.enemies.forEach((enemie) =>{
          if(this.character.isColliding(enemie)){
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy)
          }
        }); 
      }
    
}