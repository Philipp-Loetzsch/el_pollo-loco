let canvas;
let world;
let keyboard = new Keyboard();

function init() {
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


// Funktion, um Button gedrückt zu registrieren
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
