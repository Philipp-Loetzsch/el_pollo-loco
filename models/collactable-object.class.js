class CollactableObject extends CollidingObject {

 constructor(){
    super();
    this.y =  50 + Math.random() * 180;
    this.x = 150 + Math.random() * 2350;
 }
}
