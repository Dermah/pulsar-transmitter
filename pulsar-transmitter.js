var dgram = require('dgram');

var Transmitter = function () {};

Transmitter.prototype.transmit = function (packet) {
  var client = dgram.createSocket("udp4");

  packet = wrapPulse(packet);
  packet = new Buffer(JSON.stringify(packet));
  
  client.bind(function() {
    client.setBroadcast(true);
    client.send(packet, 0, packet.length, 6660, "255.255.255.255", function(err, bytes) {
      client.close();
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