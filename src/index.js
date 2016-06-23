class Detector {
  constructor(config) {
    let router = require('./router.js');
    router(config);

    this.io = require('socket.io')(router.server);
    // Socket.io connection handling
    this.io.on('connection', function(socket){
      console.log('PULSAR: client connected');
      socket.on('disconnect', function() {
        console.log('PULSAR: client disconnected');
      });
    });
  }

  detect (pulseType, pulse) {
    this.io.emit(pulseType, pulse);
  }
}

module.exports = Detector;
