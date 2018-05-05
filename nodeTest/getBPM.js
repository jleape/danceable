var bpmSink = require('bpm.js')
var spawn = require('child_process').spawn

var getBPM = function(mp3){
    createAudioStream(mp3)
    .pipe(bpmSink())
    .on("bpm", function(bpm){
      console.log("bpm is %d", bpm)
      return bpm;
    });
    
    
    // needed to convert mp3 to proper format
    function createAudioStream(filename) {
      var args = "-t raw -r 44100 -e float -c 1 -".split(" ")
      args.unshift(filename)
      var sox = spawn("sox", args)
      return sox.stdout
    }
}
