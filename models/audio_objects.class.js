class AudioObjects extends DrawableObject {
  walking_sound = new Audio("audio/running.mp3");
  hurt_sound = new Audio("audio/char_hit.mp3");
  healing_sound = new Audio("audio/heal_up.mp3");
  dying_sound = new Audio("audio/char_dye.mp3");
  gameOver_theme = new Audio("audio/gameover_theme.mp3");
  winnningTheme = new Audio("audio/winning_theme.mp3");
  collectCoin = new Audio("audio/collect_coin.mp3");
  killChickenAudio = new Audio("audio/kill_chicken.mp3");
  killChickenSmallAudio = new Audio("audio/kill_chicken_small.mp3");
  splashSound = new Audio("audio/broken-bottle.mp3");
  spinningSound = new Audio("audio/Throw_spinning_Object.mp3");

  SOUNDS = [
    this.walking_sound,
    this.hurt_sound,
    this.healing_sound,
    this.dying_sound,
    this.gameOver_theme,
    this.winnningTheme,
    this.collectCoin,
    this.killChickenAudio,
    this.killChickenSmallAudio,
    this.splashSound,
    this.spinningSound,
  ];

  constructor() {
    super();
    this.muteAudio();
  }
  muteAudio() {
    setInterval(() => {
      this.SOUNDS.forEach((element) => {
        element.muted = isMuted;
      });
    }, 100);
  }
}
