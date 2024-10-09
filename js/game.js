let canvas;
let world;
let keyboard = new Keyboard();
let mainTheme = new Audio('audio/main_menu.mp3')
let world_music = new Audio("audio/world_theme.mp3");
let isMuted = false
let mediaElements = [mainTheme, world_music]
let intervalMain
let gameStart = false

function enableAudioOnInteraction() {
  window.removeEventListener('click', enableAudioOnInteraction); 
  window.removeEventListener('keydown', enableAudioOnInteraction); 
  playMainTheme();
}

window.addEventListener('click', enableAudioOnInteraction);
window.addEventListener('keydown', enableAudioOnInteraction);

function playMainTheme(){
  intervalMain = setInterval(() => {
  if(gameStart) return  clearInterval(intervalMain)
  mainTheme.play().catch(error => {
      console.error("Fehler beim Abspielen des Audios:", error);
      mainTheme.load();  
      setTimeout(() => {
          playMainTheme();  
      }, 1000); 
    });
  }, 1000);
  mainTheme.volume = 0.5
}


function init() {
  gameStart = true
  mainTheme.pause()
  world_music.play()
  document.getElementById('mainMenu').classList.remove("menu")
  document.getElementById('startScreen').classList.remove("start-screen")
  document.getElementById('controls').classList.remove('control')
  document.getElementById('settings').classList.remove('settings')
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function openFullscreen() {
  let game = document.getElementById('gameScreen');
  let imgFullscreen = document.getElementById('imgFullscreen')
  if (!document.fullscreenElement &&  
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement) {    
    if (game.requestFullscreen) {
      game.requestFullscreen();
    } else if (game.webkitRequestFullscreen) { 
      game.webkitRequestFullscreen();
    } else if (game.msRequestFullscreen) { 
      game.msRequestFullscreen();
    }
    imgFullscreen.src = 'img/10_mobile_icons/normal_screen.png'
  } else {
      if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { 
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
       imgFullscreen.src = 'img/10_mobile_icons/full-screen.png'
  }
}


function reloadGame(){
  location.reload();
}

function toggleSettings(){
  document.getElementById('settings').classList.toggle('settings')
  document.getElementById('controls').classList.remove('control')
}

function toggleControl(){
  document.getElementById('controls').classList.toggle('control')
  document.getElementById('settings').classList.remove('settings')
}

function muteVolume(){
  isMuted = !isMuted;
  mediaElements.forEach(element => {
    element.muted = isMuted;
  });
  if(isMuted){
    document.getElementById('muteVolumeImg').src = 'img/10_mobile_icons/mute.png';
  }
  else{
    document.getElementById('muteVolumeImg').src = 'img/10_mobile_icons/volume.png';
  }
}

function touchButton(buttonId) {
  switch (buttonId) {
      case 'left':
          keyboard.LEFT = true;
          break;
      case 'right':
          keyboard.RIGHT = true;
          break;
      case 'h':
          keyboard.H = true;
          break;
      case 'd':
          keyboard.D = true;
          break;
      case 'space':
          keyboard.SPACE = true;
          break;
      default:
          console.log('Unbekannter Button: ' + buttonId);
  }
}

// Funktion, um das Loslassen eines Buttons zu registrieren
function releaseButton(buttonId) {
  switch (buttonId) {
      case 'left':
          keyboard.LEFT = false;
          break;
      case 'right':
          keyboard.RIGHT = false;
          break;
      case 'h':
          keyboard.H = false;
          break;
      case 'd':
          keyboard.D = false;
          break;
      case 'space':
          keyboard.SPACE = false;
          break;
      default:
          console.log('Unbekannter Button: ' + buttonId);
  }
}


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
