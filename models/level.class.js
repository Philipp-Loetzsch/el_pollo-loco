class Level{
    enemies;
    clouds;
    backgroundObjects;
    collactableObjects;
    level_end_x = 2500;

    constructor(enemies, clouds, backgroundObjects, collactableObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collactableObjects = collactableObjects
    }
}