pulsar-transmitter
==================

Node.js implementation of a Pulsar Transmitter

## Install

    npm install

## Test

    npm test

This runs jshint and mocha

## Use

    var Transmitter = require ("./pulsar-transmitter");
    var t = new Transmitter();
    t.transmit({"Name": "lol"});

