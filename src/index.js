const EventEmitter = require('events');

class Ether extends EventEmitter {
  constructor(config) {
    super();

    let Router = require('./router.js');
    let router = new Router(config);

    this.io = require('socket.io')(router.server);

    // Socket.io connection handling
    this.io.on('connection', socket => {
      console.log('PULSAR: client connected');
      socket.on('disconnect', () => {
        console.log('PULSAR: client disconnected');
      });

      socket.on('pulse', pulse => {
        this.emit('pulse', pulse);
        console.log('PULSE');
        console.log(pulse);
      })
    });
  }

  detect (pulseType, pulse) {
    this.io.emit(pulseType, pulse);
  }
}

module.exports = Ether;
