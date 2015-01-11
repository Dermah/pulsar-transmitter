var expect = require('expect.js');

var Transmitter = require('../pulsar-transmitter.js');

var dgram = require("dgram");

var createListener = function (server, port) {
  server.on("listening", function () {
    var address = server.address();
    //console.log("server listening " +
    //  address.address + ":" + address.port);
  });

  server.on("error", function (err) {
    //console.log("server error:\n" + err.stack);
    server.close();
    cb("dgram socket failure: " + err.stack);
    expect().fail("dgram socket failure");
  });

  server.bind(port);
};

var destroyListener = function (server) {
  server.close();
};

describe ('Transmitter', function() {

  describe ('#transmit()', function() {
    it ('should transmit information via UDP', function (done) {
      var pulse = {
        "Pulse": "lolwat"
      };

      var server = dgram.createSocket("udp4");
      createListener(server, 6660);
      
      server.on("message", function (msg, rinfo) {
        destroyListener(server);
        server.recievedPulse = JSON.parse(msg);
        expect(server.recievedPulse).to.be.ok();
        done();
      });

      var t = new Transmitter();
      t.transmit(pulse);
    });

    it ('should transmit the given valid JSON wrapped in a Pulsar packet', function (done) {
      var pulse = {
        Json: "Information",
        Things: [
          "string"
        ]
      };

      var expectedPulse = {
         Pulsar: "0.0.1",
         Pulses: [
            pulse
         ]
      };

      var server = dgram.createSocket("udp4");
      createListener(server, 6660);

      server.on("message", function (msg, rinfo) {
        destroyListener(server);
        server.recievedPulse = JSON.parse(msg);
        expect(server.recievedPulse).to.eql(expectedPulse);
        done();
      });

      var t = new Transmitter();
      t.transmit(pulse);
    });

    it ('should transmit packets to port 6660', function (done) {
      var pulse = {
        Content: "hello friend"
      };

      var server = dgram.createSocket("udp4");
      createListener(server, 6660);

      server.on("message", function (msg, rinfo) {
        destroyListener(server);
        server.recievedPulse = JSON.parse(msg);
        expect(server.recievedPulse).to.be.ok();
        done();
      });

      var t = new Transmitter();
      t.transmit(pulse);
    });

    it ('should be able to transmit multiple times', function (done) {
    var pulse = {
      "Content": "pulse1"
    };
    var counter = 0;


    var server = dgram.createSocket("udp4");
    createListener(server, 6660);

    server.on("message", function (msg, rinfo) {
      counter++;
      if (counter === 3) {
        done();
      }
    });

    var t = new Transmitter();
    t.transmit(pulse);
    t.transmit(pulse);
    t.transmit(pulse);

  });

  });
});
