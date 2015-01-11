var dgram = require('dgram');

var Transmitter = function () {};

Transmitter.prototype.transmit = function (packet) {
  var client = dgram.createSocket("udp4");
  packet = new Buffer(JSON.stringify(packet));
  client.bind(function() {
    client.setBroadcast(true);
    client.send(packet, 0, packet.length, 6660, "255.255.255.255", function(err, bytes) {
      //console.log(packet);
    });
  });
}

module.exports = Transmitter;