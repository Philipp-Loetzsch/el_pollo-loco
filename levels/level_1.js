let level1 = new Level(
  createEnemies(15), // 4 Hühner und ein Endboss
  createClouds(10),  // 5 Wolken
  [
    ...duplicateBackground() // Spread Operator, um die Hintergrundobjekte zu erweitern
  ],
  createRandomBottlesAndCoins(30) // maximal 30 Flaschen und Münzen
);


function createEnemies(count) {
  let enemies = [];
  for (let i = 0; i < count - 1; i++) { 
    let offset = 700 * i;
    enemies.push(new Chicken(offset));
  }
  enemies.push(new Endboss()); 
  return enemies;
}


function createClouds(count) {
  let clouds = [];
  for (let i = 0; i < count; i++) {
    let offset = 500 * i; 
    clouds.push(new Cloud(offset));
  }
  return clouds;
}


function duplicateBackground() {
  let layers = [
    ["../img/5_background/layers/air.png", "../img/5_background/layers/3_third_layer/2.png", "../img/5_background/layers/2_second_layer/2.png", "../img/5_background/layers/1_first_layer/2.png"],
    ["../img/5_background/layers/air.png", "../img/5_background/layers/3_third_layer/1.png", "../img/5_background/layers/2_second_layer/1.png", "../img/5_background/layers/1_first_layer/1.png"]
  ];

  let backgroundObjects = [];

  for (let i = -1; i < 8; i++) { 
    let offset = 719 * i;
    let currentLayerSet = layers[(i + 1) % 2]; 

    currentLayerSet.forEach((layerPath) => {
      backgroundObjects.push(new BackgroundObject(layerPath, offset));
    });
  }

  return backgroundObjects;
}


function createRandomBottlesAndCoins(maxCount) {
  let bottlesAndCoins = [];
  let totalItems = Math.floor(Math.random() * (maxCount / 2)) * 2;
  
  if (totalItems === 0) totalItems = 2; 
  
  let halfItems = totalItems / 2; 

  for (let i = 0; i < halfItems; i++) {
    let randomOffsetBottle = Math.floor(Math.random() * 3000); 
    let randomOffsetCoin = Math.floor(Math.random() * 3000);
    bottlesAndCoins.push(new Bottle(randomOffsetBottle));
    bottlesAndCoins.push(new Coin(randomOffsetCoin));
  }

  return bottlesAndCoins;
}
