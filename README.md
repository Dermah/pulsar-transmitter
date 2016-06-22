# pulsar-transmitter

Node.js implementation of a Pulsar Transmitter

Very tightly coupled with [pulsar `v0.2.x`](https://github.com/Dermah/pulsar/tree/v0.2.1), see that readme for how `pulsar-transmitter` is used.

## Usage

This will start a pulsar server thing at `http://localhost:3000`:

```JavaScript
let Detector = require('@dermah/pulsar-transmitter');
let detector = new Detector(config);
```

`config` is an object that looks like:

```JSON
{
  "totalCols" : 2,
  "totalRows" : 2,
  "songPath": "./song.mp3"
}
```

where `totalCols` and `totalRows` are the number of columns and rows respectively that there will be in the pulsar grid. `songPath` is used by other modules.

Give pulses to the detector like so:

```JavaScript
detector.detect('pulse', pulse);
```

It's a good idea to pass pulses emitted an pulse emitter (like [`pulsar-input-keyboard`](https://github.com/Dermah/pulsar-input-keyboard)) straight to the detector. If you have a pulse emitter in `input`, you could do this like so:

```JavaScript
input.on('pulse', pulse => {
  detector.detect('pulse', pulse);
});
```
