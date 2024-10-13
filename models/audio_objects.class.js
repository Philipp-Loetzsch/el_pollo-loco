class AudioObjects extends DrawableObject {
  audioPaths = {
    walkingSound: "audio/running.mp3",
    hurtSound: "audio/char_hit.mp3",
    healingSound: "audio/heal_up.mp3",
    dyingSound: "audio/char_die.mp3",
    collectCoin: "audio/collect_coin.mp3",
    collectBottle: "audio/collect_bottle.mp3",
    killChicken: "audio/kill_chicken.mp3",
    killChickenSmall: "audio/kill_chicken_small.mp3",
    splashSound: "audio/broken-bottle.mp3",
    spinningSound: "audio/Throw_spinning_Object.mp3",
    snoringSound: "audio/snoring.mp3",
    bossDyingSound: "audio/boss_die.mp3",
    bossWalkingSound: "audio/boss_walking.mp3",
    bossHurtSound: "audio/boss_hurt.mp3",
    bossAttackSound: "audio/boss_attack.mp3",
    bossAlertSound: "audio/alert.mp3",
    jumpSound: "audio/jump_sound.mp3",
  };
  audioInstances = {};

  constructor() {
    super();
  }

  /**
   * Loads a sound by name, creating a new audio instance if it doesn't exist.
   * @param {string} - Name of the sound to load.
   * @returns {Audio} - The loaded audio instance.
   */
  loadSound(soundName) {
    if (!this.audioInstances[soundName]) {
      this.audioInstances[soundName] = new Audio(this.audioPaths[soundName]);
    }
    return this.audioInstances[soundName];
  }

  /**
   * Plays a specified sound at a given volume, if not muted.
   * @param {string} - Name of the sound to play.
   * @param {number} - Volume level (0.0 to 1.0).
   */
  playSound(soundName, volume) {
    if (isMuted) return;
    let sound = this.loadSound(soundName);
    sound.play();
    sound.volume = volume;
  }

  /**
   * Pauses a specified sound.
   * @param {string} - Name of the sound to pause.
   */
  pauseSound(soundName) {
    let sound = this.loadSound(soundName);
    sound.pause();
  }
}
