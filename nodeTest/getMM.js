const mm = require('music-metadata');
const util = require('util')

const getMM = function(mp3path){
    mm.parseFile(mp3path, {native: true})
    .then(function (metadata) {
        console.log(util.inspect(metadata, { showHidden: false, depth: null }));
        console.log(metadata.common.title);
    })
    .catch(function (err) {
        console.error(err.message);
    });
};

var mp3MM = getMM('./CNN/Input/Raw/new.mp3');

