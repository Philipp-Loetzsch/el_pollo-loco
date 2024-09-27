class CollidingObject extends DrawableObject{
   
    checkThrowObjects(){
        if (world.keyboard.D) {
          let bottle = new ThrowableObject(world.character.x + 100, world.character.y + 100)
          world.throwableObjects.push(bottle)
        }
      }
    
      checkCollisions(){
        world.level.enemies.forEach((enemie) =>{
          if(world.character.isColliding(enemie)){
            world.character.hit();
            world.healthBar.setPercentage(world.character.energy)
          }
        }); 
      }
    
}