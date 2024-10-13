/**
 * Initializes the game level by creating enemies, clouds, background, and collectables.
 */
function initLevel() {
  level1 = new Level(
    createEnemies(15, 200),
    createClouds(10),
    duplicateBackground(),
    createCollectableObjects(16, 200)
  );
}

/**
 * Generates an array of enemies with random types and positions.
 * @param {number} count - Number of enemies to create.
 * @param {number} minDistance - Minimum distance between enemies.
 * @returns {Array} - Array of enemies.
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
 * Creates an array of clouds positioned in the game world.
 * @param {number} count - Number of clouds.
 * @returns {Array} - Array of cloud objects.
 */
function createClouds(count) {
  let clouds = [];
  for (let i = 0; i < count; i++) {
    clouds.push(new Cloud(500 * i));
  }
  return clouds;
}

/**
 * Duplicates background layers and alternates between two sets.
 * @returns {Array} - Array of background objects.
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

/**
 * Creates an array of collectable objects with random types and positions.
 * @param {number} maxCount - Maximum number of collectables.
 * @param {number} minDistance - Minimum distance between collectables.
 * @returns {Array} - Array of collectable objects.
 */
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

/**
 * Generates a random position based on a previous position and a minimum distance.
 * @param {number} previousPosition - Previous x-position.
 * @param {number} minDistance - Minimum distance to the new position.
 * @returns {Array} - [x, y] coordinates.
 */
function generatePosition(previousPosition, minDistance) {
  let x = previousPosition + minDistance + Math.floor(Math.random() * 50);
  let y = Math.floor(100 + Math.random() * 100);
  return [x, y];
}
