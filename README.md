# pulsar-transmitter

Node.js implementation of a Pulsar Transmitter

Very tightly coupled with [pulsar `v0.2.x`](https://github.com/Dermah/pulsar/tree/v0.2.1), see that readme for how `pulsar-transmitter` is used.

## Usage

This will start a pulsar server thing at `localhost:3000`:

```JavaScript
var transmitter = require('@dermah/pulsar-transmitter')(config);
```

You can control pulses sent using the keyboard in the terminal window.

`config` is an object that looks like:

```JSON
{
  "totalCols" : 2,
  "totalRows" : 2,
  "songPath": "./song.mp3"
}
```

where `totalCols` and `totalRows` are the number of columns and rows respectively that there will be in the pulsar grid, and `songPath` is the relative path to an mp3 file that can be played by pressing the `F8` key.

## Capabilities

This transmitter handles too much of pulsar's logic. It should only handle packet transmission to pulsar receivers. It currently handles:
* Data transmission to pulsar receivers
* Serving of js and image assets
* Keyboard input to transmitter
* Keylogging and playback
* Timed/repeated/combination release of pulsar packets
* Music playing

This is all documented in [pulsar](https://github.com/Dermah/pulsar/tree/v0.2.1) where the actual code should be. These features will be extracted in future releases. 
