const BPM = require('bpm');
const b = new BPM();

b.tap();
setTimeout(function() {
  console.log(b.tap());
}, 1000);