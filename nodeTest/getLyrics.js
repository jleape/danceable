var lyr = require('lyrics-fetcher');

const getLyrics = function(artist, title){
    lyr.fetch(artist, title, function (err, lyrics) {
        console.log(err || lyrics);
        return err || lyrics;
    });
}
