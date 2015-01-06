var expect = require('expect.js');

var Transmitter = require('../pulsar-transmitter.js');

var dgram = require("dgram");
var server = dgram.createSocket("udp4");

var createListener = function () {
  server.on("listening", function () {
    var address = server.address();
    console.log("server listening " +
      address.address + ":" + address.port);
  });

  server.on("error", function (err) {
    console.log("server error:\n" + err.stack);
    server.close();
    cb("dgram socket failure: " + err.stack);
    expect().fail("dgram socket failure");
  });

  server.bind(6660);
};

var destroyListener = function () {
  server.close();
}

describe ('Transmitter', function() {

  before( function() {
    createListener();
  });

  after ( function () {
    destroyListener();
  });

  describe ('#transmit()', function() {
    it ('should transmit information via UDP', function (done) {
      var pulse = {
        "Pulse": "lolwat"
      }

      server.on("message", function (msg, rinfo) {
        server.recievedPulse = JSON.parse(msg);
        done();
      });


      var t = new Transmitter();
      t.transmit(pulse);
    });

    it ('should transmit the given valid JSON wrapped in a Pulsar packet', function () {
      var pulse = {
        Json: "Information",
        Things: [
          "string"
        ]
      }

      var expectedPulse = {
         Pulsar: "0.0.1",
         Pulses: [
            pulse
         ]
      }

      server.on("message", function (msg, rinfo) {
        server.recievedPulse = JSON.parse(msg);
        expect(server.recievedPulse).to.eql(expectedPulse);
        done();
      });


      var t = new Transmitter();
      t.transmit(pulse);
    });

    it ('should transmit packets to port 6660', function () {
      expect().fail();
    });

  })
})
