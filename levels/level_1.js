let level1;
function initLevel(){
level1 = new Level(
  createEnemies(15, 200), 
  createClouds(10),  
  duplicateBackground(), 
  createCollectableObjects(16, 200) 
);

/**
 * Ceate all enemies and place the random in world
 * @param {number} count this parameter is the amount of enemeies
 * @param {number} minDistance this parameter is the minimum distance the next enemie will create
 * @returns return an array with every enemie and there values
 */
function createEnemies(count, minDistance) {
  let enemies = [];
  let previousPosition = 100; 
  for (let i = 0; i < count; i++) {
    let [x, y] = generatePosition(previousPosition, minDistance);
    enemies.push(Math.random() < 0.5 ? new Chicken(x, y) : new ChickenSmall(x, y));
    previousPosition = x; 
  }
  enemies.push(new Endboss());
  return enemies;
}

/**
 * create the clouds of the world
 * @param {*} count this parameter is the amount of clouds
 * @returns array with position and picture of clouds
 */
function createClouds(count) {
  let clouds = [];
  for (let i = 0; i < count; i++) {
    clouds.push(new Cloud(500 * i)); 
  }
  return clouds;
}

/**
 * duplicate the Background and change everey second picture between layer one and two
 * @returns 
 */
function duplicateBackground() {
  let layers = [
    ["img/5_background/layers/air.png", "img/5_background/layers/3_third_layer/2.png", "img/5_background/layers/2_second_layer/2.png", "img/5_background/layers/1_first_layer/2.png"],
    ["img/5_background/layers/air.png", "img/5_background/layers/3_third_layer/1.png", "img/5_background/layers/2_second_layer/1.png", "img/5_background/layers/1_first_layer/1.png"]
  ];
  let backgroundObjects = [];
  for (let i = -1; i < 8; i++) {
    let offset = 719 * i;
    let currentLayerSet = layers[(i + 1) % 2];
    currentLayerSet.forEach(layerPath => {
      backgroundObjects.push(new BackgroundObject(layerPath, offset));
    });
  }
  return backgroundObjects;
}

function createCollectableObjects(maxCount, minDistance) {
  let collectables = [];
  let previousPosition = 100; 
  for (let i = 0; i < maxCount; i++) {
    let [x, y] = generatePosition(previousPosition, minDistance);
    collectables.push(Math.random() < 0.5 ? new Bottle(x, y) : new Coin(x, y));
    previousPosition = x; 
  }
  return collectables;
}

function generatePosition(previousPosition, minDistance) {
  let x = previousPosition + minDistance + Math.floor(Math.random() * 50); 
  let y = Math.floor(100 + Math.random() * 100); 
  return [x, y];
}
}