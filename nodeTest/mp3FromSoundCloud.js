// mp3FromSoundCloud
SoundRain = require('soundrain');

const mp3FromSoundCloud = function(soundCloudURL){
    var Song = new SoundRain(soundCloudURL, './input');
    Song.on('error', function(err) {
        if(err) throw err;
    }).on('done', function(file) {
        console.log(file);
    });
}