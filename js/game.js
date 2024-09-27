let canvas;
let world;
let keyboard = new Keyboard()

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
   switch (e.key) {
     case 'ArrowRight':
       keyboard.RIGHT = true;
       break;
     case 'ArrowLeft':
       keyboard.LEFT = true;
       break;
     case 'ArrowUp':
       keyboard.UP = true;
       break;
     case 'ArrowDown':
       keyboard.DOWN = true;
       break;
     case ' ':
       keyboard.SPACE = true;
       break;
     case 'd':
     case 'D':
       keyboard.D = true;
       break;
   }
 });
 
 window.addEventListener('keyup', (e) => {
   switch (e.key) {
     case 'ArrowRight':
       keyboard.RIGHT = false;
       break;
     case 'ArrowLeft':
       keyboard.LEFT = false;
       break;
     case 'ArrowUp':
       keyboard.UP = false;
       break;
     case 'ArrowDown':
       keyboard.DOWN = false;
       break;
     case ' ':
       keyboard.SPACE = false;
       break;
     case 'd':
     case 'D':
       keyboard.D = false;
       break;
   }
 });
 