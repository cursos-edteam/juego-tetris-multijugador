let PLAYERS = {};  // Nombres 
let IDS = {}; // id del socket

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('./dist'));

io.on('connection', (socket) => {
  socket.on('startGame', (data) => {
    const { name } = data;
    if (name) {
      IDS = {
        ...IDS,
        [socket.id]: name
      };
      PLAYERS = {
        ...PLAYERS,
        [name]: 'on'
      };
      const names = Object.keys(PLAYERS);
      let templateHTML = '';
      for (let name in names) {
        if (names[name]) {
          templateHTML += `<li>Jugador: ${names[name]}</li>`;
        }
      }
      io.sockets.emit('players', templateHTML);
    }
  })

  socket.on('disconnect', () => {
    const namePlayer = IDS[socket.id];
    delete PLAYERS[namePlayer];
    delete IDS[socket.id];

    const names = Object.keys(PLAYERS);
    let templateHTML = '';
    for (let name in names) {
      if (names[name]) {
        templateHTML += `<li>Jugador: ${names[name]}</li>`;
      }
    }
    io.sockets.emit('players', templateHTML);
  })

})


server.listen(3000, () => {
  console.log('------------------------------------');
  console.log('Servidor corriendo en el puerto : 3000');
  console.log('------------------------------------');
})