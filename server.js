//const bootstrap = require('bootstrap');
//require('bootstrap/dist/css/bootstrap.css');

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const util = require('util');
const fs = require('fs-extra');
const chart = require('chart.js');
const PythonShell = require('python-shell');
const spawn = require('child_process').spawn
const getYouTube = require('youtube-mp3');
const BPM = require('bpm');
const bpmSink = require('bpm.js');
const mm = require('music-metadata');
const callCNN = require('./nodeTest/callCNN.js')
const ID3Writer = require('browser-id3-writer')

const app = express();

const mp3dir = __dirname + '/CNN/Input/Raw/'
const mp3path = mp3dir + 'new.mp3'

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

// Set static path
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname, { index: 'index.htm' }));

// Initialize EJS variables
app.get('/', async function(req, res){
    res.render('index', {
        title: '',
        artist: '',
        album: '',
        year: '',
        predictionArray: 'let cnnArray = [0,0,0,0];',
        machineBPM: 'let machineBPM = 0;',
        mp3downloadHref: '/CNN/Input/Raw/new.mp3',
        duration: 'animation: moveSlideshow 180s linear infinite,'
    });
});

// const jobs = {};
// app.get('/jobs/:id', function(req, res) {
//     if (jobs[req.body.id]) {
//         // send in resp whatever you need
//         res.body = { done: true, /* toher stuff */}
//     } else {
//         res.body = { done: false };
//     }
// })


// --- Receive MP3 ---
app.post('/input', async function(req, res) {
    if (!req.files && !req.body.soundCloudURL && !req.body.youTubeURL){
        return res.status(400).send('No files were uploaded.');
    }
    if(req.body.soundCloudURL){
        let soundCloudURL = req.body.soundCloudURL;
        await mp3FromSoundCloud(soundCloudURL, mp3dir);
    };
    if(req.body.youTubeURL){
        let youTubeURL = req.body.youTubeURL;
        await mp3FromYouTube(youTubeURL, mp3dir);
    };
    if(req.files.mp3File){
        let mp3File = req.files.mp3File;
        await mp3File.mv(mp3path);
    };
    const metadata = await mm.parseFile(mp3path);
    const mmTitle = metadata.common.title || '';
    const mmArtist = metadata.common.artist || '';
    const mmAlbum = metadata.common.album || '';
    const mmYear = metadata.common.year || '';
    const mmBPM = metadata.common.bpm || 0;
    mmDuration = metadata.format.duration || 180;
    // let machineBPM = 0;
    // await getBPM(mp3path);
    const durationStr = 'animation: moveSlideshow ' + mmDuration + 's linear infinite';
    const prediction = await callCNN();
    const predictionArray = [prediction.Afrobeat, prediction['Brazilian Zouk'], prediction.Bachata, prediction.Kizomba];
    const predictionStr = 'let cnnArray = [' + predictionArray + '];';
    console.log(predictionStr)
    const machineBPMstr = 'let machineBPM = ' + mmBPM + ';';
    console.log(machineBPMstr)
    res.render('index', { 
        title: mmTitle,
        artist: mmArtist,
        album: mmAlbum,
        year: mmYear,
        predictionArray: predictionStr,
        machineBPM: machineBPMstr,
        mp3downloadHref: '/CNN/Input/Raw/new.mp3',
        duration: durationStr
    });
});

// --- Receive Feedback ---
app.post('/corrected', async function(req, res) {
    const outputMP3path = __dirname + '/CNN/Input/Corrected/';
    const songBuffer = fs.readFileSync(mp3path);
    const writer = new ID3Writer(songBuffer);
    const dataPath = __dirname + '/CNN/Data/Raw/';

    console.log(req.body.bpmInput);
    // BPM
    if(req.body.bpmInput != ''){
        writer.setFrame('TBPM', req.body.bpmInput);
    };

    // Meta data
    if(req.body.title){
        writer.setFrame('TIT2', req.body.title)
    };
    if(req.body.artist){
        writer.setFrame('TPE1', [req.body.artist])
    };
    if(req.body.album){
        writer.setFrame('TALB', req.body.album)
    };
    if(req.body.year){
        writer.setFrame('TYER', req.body.year)
    };

    writer.addTag();

    const taggedSongBuffer = Buffer.from(writer.arrayBuffer);
    fs.writeFileSync(outputMP3path + req.body.title + '.mp3', taggedSongBuffer);

    // Suitable dance styles
    let suitabilityArray = [0,0,0,0];
    if(req.body.afrobeat){
        fs.writeFileSync(dataPath + 'Afrobeat/' + req.body.title + '.mp3', taggedSongBuffer);
        suitabilityArray[0] = 1;
    };
    if(req.body.bachata){
        fs.writeFileSync(dataPath + 'Bachata/' + req.body.title + '.mp3', taggedSongBuffer);
        suitabilityArray[1] = 1;
    };
    if(req.body.brazilianZouk){
        fs.writeFileSync(dataPath + 'Brazilian Zouk/' + req.body.title + '.mp3', taggedSongBuffer);
        suitabilityArray[2] = 1;
    };
    if(req.body.kizomba){
        fs.writeFileSync(dataPath + 'Kizomba/' + req.body.title + '.mp3', taggedSongBuffer);
        suitabilityArray[3] = 1;
    };

    const mp3downloadLink = 'CNN/Input/Corrected/' + req.body.title + '.mp3';
    const durationStr = 'animation: moveSlideshow ' + mmDuration + 's linear infinite';

    res.render('index', { 
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        predictionArray: 'let cnnArray = [' + suitabilityArray + '];',
        machineBPM: 'let machineBPM = ' + req.body.bpmInput + ';',
        mp3downloadHref: mp3downloadLink,
        duration: durationStr
    });
});

app.listen(8000, function () {
    console.log('Server running on port 8000...');
})

// getBPM
const createAudioStream = function(filename) {
    var args = "-t raw -r 44100 -e float -c 1 -".split(" ")
    args.unshift(filename)
    var sox = spawn("sox", args)
    return sox.stdout;
};

const getBPM = function(mp3){
    createAudioStream(mp3)
    .pipe(bpmSink())
    .on("bpm", function(bpm){
      console.log("bpm is %d", bpm)
      console.log(typeof bpm)
      machineBPM = bpm;
    });
};

// mp3FromYouTube
const mp3FromYouTube = async function(youTubeURL, path){
    getYouTube.download(youTubeURL, path, function(err) {
        if(err) return console.log(err);
        console.log('Download completed!');
    });
};

// getMeta
const parseMP3File = async function(path) {
    return new Promise((resolve, reject) => {
        console.log(path);
        mm.parseFile(fs.createReadStream(path), function (err, metadata) {
            if (err) reject(err);
            resolve(metadata);      
        });                 
    });
}