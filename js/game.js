let canvas;
let world;
let keyboard = new Keyboard();
let mainTheme = new Audio('audio/main_menu.mp3')

function playMainTheme(){
  mainTheme.play().catch(error => {
    console.error("Fehler beim Abspielen des Audios:", error);
    mainTheme.load();  
    setTimeout(() => {
        playMainTheme();  
    }, 1000); 
  });
  mainTheme.volume = 0.5
}

function init() {
  mainTheme.pause()
  document.getElementById('mainMenu').classList.remove("menu")
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}


function openFullscreen() {
  let game = document.getElementById('game')
  if (game.requestFullscreen) {
    game.requestFullscreen();
  } else if (game.webkitRequestFullscreen) {
    game.webkitRequestFullscreen();
  } else if (game.msRequestFullscreen) {
    game.msRequestFullscreen();
  }
}

function reloadGame(){
  location.reload();
}

function toggleSettings(){
  document.getElementById('settings').classList.toggle('settings')
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
