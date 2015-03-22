var dgram = require('dgram');

var Transmitter = function () {};

Transmitter.prototype.transmit = function (packet) {
  var socket = dgram.createSocket("udp4");

  packet = wrapPulse(packet);
  packet = new Buffer(JSON.stringify(packet));
  
  socket.bind(function() {
    socket.setBroadcast(true);
    socket.send(packet, 0, packet.length, 6660, "255.255.255.255", function(err, bytes) {
      socket.close();
      console.log("Sent: " + packet);
    });
  });
};

function wrapPulse(pulse) {
  return {
    "Pulsar": "0.0.1",
    "Pulses": [
      pulse
    ]
  };
}

module.exports = Transmitter;