let canvas;
let level;
let keyboard = new Keyboard();
let world;
let mainTheme = new Audio("audio/main_menu.mp3");
let world_music = new Audio("audio/world_theme.mp3");
let gameOverTheme = new Audio ("audio/gameover_theme.mp3")
let winningTheme = new Audio ("audio/winning_theme.mp3")
let isMuted = false;
let mediaElements = [mainTheme, world_music, gameOverTheme, winningTheme];
let intervalMain;
let gameStart = false;

window.addEventListener('load', () => {
  let preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
});

/**
 * Enables audio playback upon the first user interaction (click or keydown).
 */
function enableAudioOnInteraction() {
  window.removeEventListener("click", enableAudioOnInteraction);
  window.removeEventListener("keydown", enableAudioOnInteraction);
  playMainTheme();
}

window.addEventListener("click", enableAudioOnInteraction);
window.addEventListener("keydown", enableAudioOnInteraction);

/**
 * load the world and level 1 for faster loading game
 */
function initWorld(){
  canvas = document.getElementById("canvas");
  initLevel()
  world = new World(canvas, keyboard);
  clearAllIntervals()
}

/**
 * Starts playing the main theme on a loop until the game starts.
 */
function playMainTheme() {
  mainTheme.currentTime = 0
  intervalMain = setInterval(() => {
    if (gameStart) return clearInterval(intervalMain);
     mainTheme.play().catch((error) => {
      console.error("Fehler beim Abspielen des Audios:", error);
      mainTheme.load();
      setTimeout(() => {
        playMainTheme();
      }, 1000);
    });
  }, 1000);
  mainTheme.volume = 0.3;
}

/**
 * Initializes the game environment, including setting up the canvas and playing world music.
 */
function init() {
  mainTheme.pause();
  playTheme(world_music, 0.1)
  document.getElementById("mainMenu").classList.remove("menu");
  document.getElementById("startScreen").classList.remove("start-screen");
  document.getElementById("controls").classList.remove("control");
  document.getElementById("settings").classList.remove("settings");
  canvas = document.getElementById("canvas");
  initLevel()
  world = new World(canvas, keyboard);
  gameStart = true;
}

/**
 * Toggles fullscreen mode for the game screen element.
 */
function openFullscreen() {
  let game = document.getElementById("gameScreen");
  let imgFullscreen = document.getElementById("imgFullscreen");
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    fullScreen(game ,imgFullscreen)
  } else {
    normalScreen(imgFullscreen)
  }
  document.activeElement.blur();
}

/**
 * Switches the game element to fullscreen mode and updates the fullscreen button image.
 * 
 * @param {HTMLElement} game - The HTML element that should enter fullscreen mode.
 * @param {HTMLImageElement} imgFullscreen - The image element that represents the fullscreen toggle button.
 */
function fullScreen(game, imgFullscreen) {
  if (game.requestFullscreen) {
    game.requestFullscreen();
  } else if (game.webkitRequestFullscreen) { 
    game.webkitRequestFullscreen();
  } else if (game.msRequestFullscreen) {
    game.msRequestFullscreen();
  }
  imgFullscreen.src = "img/10_mobile_icons/normal_screen.png";
}

/**
 * Exits fullscreen mode and updates the fullscreen button image.
 * 
 * @param {HTMLImageElement} imgFullscreen - The image element that represents the fullscreen toggle button.
 */
function normalScreen(imgFullscreen) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { 
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { 
    document.msExitFullscreen();
  }
  imgFullscreen.src = "img/10_mobile_icons/full-screen.png";
}

/**
 * Reloads the game, resetting it to the initial state.
 */ 
function loadMainMenu() {
  gameOverTheme.pause()
  winningTheme.pause()
  playMainTheme()
  gameStart = false
  let endGame = document.getElementById("gameEnd");
  endGame.classList.remove("game-ending");
  document.getElementById("mainMenu").classList.add("menu");
  document.getElementById("startScreen").classList.add("start-screen");
}

function reloadGame(){
  gameOverTheme.pause()
  winningTheme.pause()
  let endGame = document.getElementById("gameEnd");
  endGame.classList.remove("game-ending");
  init()
}

/**
 * Toggles the visibility of the settings menu.
 */
function toggleSettings() {
  document.getElementById("settings").classList.toggle("settings");
  document.getElementById("controls").classList.remove("control");
}

/**
 * Toggles the visibility of the control instructions.
 */
function toggleControl() {
  document.getElementById("controls").classList.toggle("control");
  document.getElementById("settings").classList.remove("settings");
}

/**
 * Mutes or unmutes all audio elements based on the current mute status.
 */
function muteVolume() {
  isMuted = !isMuted;
  mediaElements.forEach((element) => {
    element.muted = isMuted;
  });
  if (isMuted) document.getElementById("muteVolumeImg").src = "img/10_mobile_icons/mute.png";
  else document.getElementById("muteVolumeImg").src = "img/10_mobile_icons/volume.png";
  document.activeElement.blur();
}

/**
 * Simulates pressing a keyboard button based on a touch input.
 * @param {string} buttonId - The ID of the button to simulate.
 */
function touchButton(buttonId) {
  switch (buttonId) {
    case "left":
      keyboard.LEFT = true;
      break;
    case "right":
      keyboard.RIGHT = true;
      break;
    case "h":
      keyboard.H = true;
      break;
    case "d":
      keyboard.D = true;
      break;
    case "space":
      keyboard.SPACE = true;
      break;
    default:
      console.log("Unbekannter Button: " + buttonId);
  }
}

/**
 * Simulates releasing a keyboard button based on a touch input.
 * @param {string} buttonId - The ID of the button to simulate.
 */
function releaseButton(buttonId) {
  switch (buttonId) {
    case "left":
      keyboard.LEFT = false;
      break;
    case "right":
      keyboard.RIGHT = false;
      break;
    case "h":
      keyboard.H = false;
      break;
    case "d":
      keyboard.D = false;
      break;
    case "space":
      keyboard.SPACE = false;
      break;
    default:
      console.log("Unbekannter Button: " + buttonId);
  }
}

/**
 * Sets keyboard properties to true based on the key pressed.
 * @param {KeyboardEvent} e - The keyboard event.
 */
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "ArrowUp":
      keyboard.SPACE = true;
      break;
    case " ":
      keyboard.SPACE = true;
      break;
    case "d":
    case "D":
      keyboard.D = true;
      break;
    case "h":
    case "H":
      keyboard.H = true;
      break;
  }
});

/**
 * Sets keyboard properties to false based on the key released.
 * @param {KeyboardEvent} e - The keyboard event.
 */
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowUp":
      keyboard.SPACE = false;
      break;
    case " ":
      keyboard.SPACE = false;
      break;
    case "d":
    case "D":
      keyboard.D = false;
      break;
    case "h":
    case "H":
      keyboard.H = false;
      break;
  }
});

/**
 * Checks the screen orientation and displays a warning if the device is in portrait mode.
 */
function checkOrientation() {
  let warning = document.getElementById("screenWarning");
  if (window.innerWidth > window.innerHeight) {
    warning.classList.remove("warning");
  } else {
    warning.classList.add("warning");
  }
}

window.addEventListener("orientationchange", checkOrientation);
window.addEventListener("resize", checkOrientation);


  /**
   * Handles the end of the game and displays the appropriate ending screen.
   * @param {string} ending - The type of ending ("win" or "lose").
   */
 function endGame(ending) {
    let endGame = document.getElementById("gameEnd");
    endGame.classList.add("game-ending");
    let imageEnding = endGame.querySelector("img");
    if (ending == "win") {
        imageEnding.src = "./img/9_intro_outro_screens/win/win_2.png";
        playTheme(winningTheme, 0.2)
    } else {
        playTheme(gameOverTheme, 0.2)
        imageEnding.src = "./img/9_intro_outro_screens/game_over/oh no you lost!.png";
    }
}
/**
 * Plays the chosen theme sound from the beginning at a specified volume level.
 * 
 * @param {HTMLAudioElement} theme - The audio element that represents the theme to be played.
 * @param {number} volume - The volume level at which the theme should be played (0.0 to 1.0).
 * @returns {Promise<void>} - A promise that resolves when the audio starts playing.
 */
function playTheme(theme, volume) {
  theme.currentTime = 0;
  theme.volume = volume;
  return theme.play();
}

/**
* Clears all intervals set in the window.
*/
  function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i); 
  }