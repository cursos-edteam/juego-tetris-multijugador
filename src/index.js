import './styles.scss';

let SOCKET;

let CONTAINER;
let INPUT_LOGIN;
let BUTTON_LOGIN;
let MESSAGES;

let CANVAS_CONTAINER;

let CANVAS;
let CONTEXT;

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 640;

const FPS = 40;

let PIECE;
const PIECE_WIDTH = 40;
const PIECE_HEIGHT = 40;

const COLORS = [
  '#581845', // Morado
  '#900C3F', // Guindo
  '#C70039', // Rosado
  '#FF5733', // Naranja
  '#FFC300', // Amarillo
  '#33B5FF', // Turqueza
  '#03400B', // Verde
];

const PIECES = [
  [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]
  ],

  [
    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0]
    ],

    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0]
    ]
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 0, 3, 3],
      [0, 3, 3, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 3, 0],
      [0, 0, 3, 3],
      [0, 0, 0, 3],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0],
      [0, 0, 3, 3],
      [0, 3, 3, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 3, 0],
      [0, 0, 3, 3],
      [0, 0, 0, 3],
      [0, 0, 0, 0]
    ]
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 4, 4],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 4, 4],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 0],
      [0, 0, 0, 0]
    ]
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 5, 5, 5],
      [0, 5, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 5, 5],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 5],
      [0, 5, 5, 5],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 5, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 0, 0]
    ]
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 6, 6, 6],
      [0, 0, 0, 6],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 6, 6],
      [0, 0, 6, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 6, 0, 0],
      [0, 6, 6, 6],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 6, 0],
      [0, 0, 6, 0],
      [0, 6, 6, 0],
      [0, 0, 0, 0]
    ]
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 7, 7, 7],
      [0, 0, 7, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 7, 0],
      [0, 0, 7, 7],
      [0, 0, 7, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 7, 0],
      [0, 7, 7, 7],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 7, 0],
      [0, 7, 7, 0],
      [0, 0, 7, 0],
      [0, 0, 0, 0]
    ]
  ]
];

const MARGIN = 4;

const PANEL_HEIGHT = 16 + MARGIN;
const PANEL_WIDTH = 10;

const PANEL = [
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 2, 4, 0, 0, 4, 2, 0, 9],
  [9, 0, 1, 1, 2, 5, 5, 5, 5, 0, 0, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
];


const objPiece = function () {
  this.x = 0;
  this.y = 0;

  this.angle = 1;
  this.pieceType = 5;

  this.delay = 50;
  this.increasingDelay = 0;

  this.new = function () {
    const position = Math.floor(Math.random() * 7);
    this.pieceType = position;
    this.x = 4;
    this.y = 0;
  }

  this.collision = function (newAngle, rowNew, columnNew) {
    let existCollision = false;
    for(let rows = 0; rows < 4; rows++) {
      for (let cols = 0; cols < 4; cols++) { 
        if (PIECES[this.pieceType][newAngle][rows][cols] !== 0) {
          if (PANEL[rowNew + rows][columnNew + cols] !== 0) {
            existCollision = true;
          }
        }
      }
    }
    return existCollision;
  }

  this.cleanRow = function () {
    let isComplete = false;
    for(let rows = MARGIN; rows < PANEL_HEIGHT; rows++) {
      isComplete = true;
      for (let cols = 1; cols < PANEL_WIDTH + 1; cols++) {
        if (PANEL[rows][cols] === 0) isComplete = false;
      }
  
      if (isComplete) {
        for(cols = 1; cols < PANEL_WIDTH + 1; cols++) {
          PANEL[rows][cols] = 0;
        }
      }
    }
  }
  
  this.draw = function () {
    for(let rows = 0; rows < 4; rows++) {
      for (let cols = 0; cols < 4; cols++) {
        if (PIECES[this.pieceType][this.angle][rows][cols] !== 0) {
          CONTEXT.fillStyle = COLORS[this.pieceType + 1];
          const x0 = (this.x + cols - 1) * PIECE_WIDTH;
          const y0 = (this.y + rows - MARGIN) * PIECE_HEIGHT;
          CONTEXT.fillRect(x0, y0, PIECE_WIDTH, PIECE_HEIGHT);
        }
      }
    } 
  }

  this.rotate = function () {
    let newAngle = this.angle;
    if (newAngle < 3) {
      newAngle++;
    } else {
      newAngle = 0;
    }
    if (!this.collision(newAngle, this.y, this.x)){
      this.angle = newAngle;
    }
  }

  this.isGameover = function () {
    let gameover = false;
    for(let rows = 1; rows < PANEL_WIDTH + 1; rows++) {
      if (PANEL[2][rows] !== 0) {
        gameover = true;
      }
    }
    return gameover;
  }

  this.isDown = function () {
    if (this.increasingDelay < this.delay) {
      this.increasingDelay++;
    } else {
      if (!this.collision(this.angle, this.y + 1, this.x)) {
        this.y++;
      } else {
        this.drawInPanel();
        this.cleanRow();
        this.new();
        if (this.isGameover()) {
          reset();
        }
      }
      this.increasingDelay = 0;
    }
  }

  this.drawInPanel = function () {
    for(let rows = 0; rows < 4; rows++) {
      for (let cols = 0; cols < 4; cols++) {
        if (PIECES[this.pieceType][this.angle][rows][cols] !== 0) {
          PANEL[this.y + rows][this.x + cols] = PIECES[this.pieceType][this.angle][rows][cols];
        }
      }
    }
  }

  this.down = function () {
    if (!this.collision(this.angle, this.y + 1, this.x)) {
      this.y++;
    }
  }
  this.left = function () {
    if (!this.collision(this.angle, this.y, this.x - 1)) {
      this.x--;
    }
  }
  this.right = function () {
    if (!this.collision(this.angle, this.y, this.x + 1)) {
      this.x++;
    }
  }

  this.new();
}

const init = () => {
  SOCKET = io();
  const existUser = localStorage.getItem('player');
  const PLAYERS = document.querySelector('#players');
  SOCKET.on('players', data => {
    PLAYERS.innerHTML = data;
  });
  if (existUser) {
    SOCKET.emit('startGame', {
      name: localStorage.getItem('player')
    });
    CONTAINER = document.querySelector('#container');
    CONTAINER.style.display = 'none';
    CANVAS_CONTAINER = document.querySelector('#canvasContainer');
    CANVAS_CONTAINER.style.display = 'block';

    CANVAS = document.querySelector('#canvas');
    CONTEXT = CANVAS.getContext('2d');
    CANVAS.style.background = '#FFF';
    CANVAS.width = CANVAS_WIDTH;
    CANVAS.height = CANVAS_HEIGHT;
  
    CANVAS.style.border = '2px solid #000';
    PIECE = new objPiece();
    addListeners();
    setInterval(() => {
      main();
    }, 1000 / FPS);
  } else {
    CONTAINER = document.querySelector('#container');
    CONTAINER.style.display = 'block';
    CANVAS_CONTAINER = document.querySelector('#canvasContainer');
    CANVAS_CONTAINER.style.display = 'none';
    BUTTON_LOGIN = document.querySelector('#btnLogin');
    INPUT_LOGIN = document.querySelector('#inputLogin');
    MESSAGES = document.querySelector('#messages');

    BUTTON_LOGIN.addEventListener('click', () => {
      if (INPUT_LOGIN.value.length > 0) {
        localStorage.setItem('player', INPUT_LOGIN.value);
        init();
        SOCKET.emit('startGame', {
          name: INPUT_LOGIN.value
        });
      } else {
        MESSAGES.innerHTML = 'No puedes entrar, necesitas un nombre de jugador';
      }
    })
  }

};

const addListeners = () => {
  document.addEventListener('keydown', (event) => {
    const { key } = event;
    if (key === 'ArrowUp') {
      PIECE.rotate();
    } else if (key === 'ArrowDown') {
      PIECE.down();
    } else if (key === 'ArrowLeft') {
      PIECE.left();
    } else if (key === 'ArrowRight') {
      PIECE.right();
    }
  })
};

const drawPanel = () => {
  for(let rows = MARGIN; rows < PANEL_HEIGHT; rows++) {
    for (let cols = 1; cols < PANEL_WIDTH + 1; cols++) {
      if (PANEL[rows][cols] !== 0) {
        CONTEXT.fillStyle = COLORS[PANEL[rows][cols]];
        const x0 = (cols - 1) * PIECE_WIDTH;
        const y0 = (rows - MARGIN) * PIECE_HEIGHT;
        CONTEXT.fillRect(x0, y0, PIECE_WIDTH, PIECE_HEIGHT);
      }
    }
  } 
}

const reset = () => {
  for(let rows = 0; rows < PANEL_HEIGHT + 1; rows ++) {
    for(let cols = 0; cols < PANEL_WIDTH + 2; cols ++) {
      if (PANEL[rows][cols] !== 9) {
        PANEL[rows][cols] = 0;
      }
    }
  }
}

const clearCanvas = () => {
  CONTEXT.fillStyle = '#FFF';
  CONTEXT.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

const main = () => {
  clearCanvas();
  drawPanel();
  PIECE.draw();
  PIECE.isDown();
}

document.addEventListener('load', init());