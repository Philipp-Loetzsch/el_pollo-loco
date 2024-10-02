let level1 = new Level(
  createEnemies(15, 200), 
  createClouds(10),  
  duplicateBackground(), 
  createCollectableObjects(20, 200) 
);

function createEnemies(count, minDistance) {
  let enemies = [];
  let previousPosition = 200; 
  for (let i = 0; i < count; i++) {
    let [x, y] = generatePosition(previousPosition, minDistance);
    enemies.push(i % 2 === 0 ? new Chicken(x, y) : new ChickenSmall(x, y));
    previousPosition = x; 
  }
  enemies.push(new Endboss());
  return enemies;
}

function createClouds(count) {
  let clouds = [];
  for (let i = 0; i < count; i++) {
    clouds.push(new Cloud(500 * i)); 
  }
  return clouds;
}

function duplicateBackground() {
  const layers = [
    ["../img/5_background/layers/air.png", "../img/5_background/layers/3_third_layer/2.png", "../img/5_background/layers/2_second_layer/2.png", "../img/5_background/layers/1_first_layer/2.png"],
    ["../img/5_background/layers/air.png", "../img/5_background/layers/3_third_layer/1.png", "../img/5_background/layers/2_second_layer/1.png", "../img/5_background/layers/1_first_layer/1.png"]
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
