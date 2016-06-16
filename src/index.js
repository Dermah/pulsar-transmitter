var Transmitter = function (config) {

  var router = require('./router.js');
  router(config);

  var io = require('socket.io')(router.server);
  // Socket.io connection handling
  io.on('connection', function(socket){
    console.log('PULSAR: client connected');
    socket.on('disconnect', function() {
      console.log('PULSAR: client disconnected');
    });
  });

  var Processor = require('@dermah/pulsar-input-keyboard');
  var processor = new Processor(config);

  processor.on('pulse', pulse => {
    io.emit('pulse', pulse)
  });
  processor.on('pulsar control', pulse => {
    io.emit('pulsar control', pulse)
  });
  processor.on('pulse update', pulse => {
    io.emit('pulse update', pulse);
  });
}

module.exports = Transmitter;
