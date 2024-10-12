class AudioObjects extends DrawableObject {
  
  audioPaths = {
    walkingSound: "audio/running.mp3",
    hurtSound: "audio/char_hit.mp3",
    healingSound: "audio/heal_up.mp3",
    dyingSound: "audio/char_die.mp3",
    gameOverTheme: "audio/gameover_theme.mp3",
    winningTheme: "audio/winning_theme.mp3",
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
    jumpSound: "audio/jump_sound.mp3"
  };

  audioInstances = {};

  constructor() {
    super();
    this.muteAll();
  }

  loadSound(soundName) {
    if (!this.audioInstances[soundName]) {
      this.audioInstances[soundName] = new Audio(this.audioPaths[soundName]);
    }
    return this.audioInstances[soundName];
  }

  playSound(soundName, volume) {
    let sound = this.loadSound(soundName);
    sound.play();
    sound.volume = volume
  }

  pauseSound(soundName) {
    let sound = this.loadSound(soundName);
    sound.pause();
  }

  muteAll() {
    setInterval(() => {
      Object.values(this.audioInstances).forEach((sound) => {
        sound.muted = isMuted;
      });
    }, 100);
  }
}
