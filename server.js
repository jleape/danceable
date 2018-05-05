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

const app = express();

// const logger = function(req, res, next){
//     console.log('Logging...');
//     next();
// };
//
//app.use(logger);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

// Set static path
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname, { index: 'index.htm' }));

const jobs = {};
app.get('/', function(req, res){
    res.render('index', {
        title: "We Won't",
        artist: 'James Young',
        album: 'Feel Something',
        year: '2017',
        predictionArray: 'let cnnArray = [2,53,15,30];',
        machineBPM: 'let machineBPM = 83;'
    });
});
// app.get('/jobs/:id', function(req, res) {
//     if (jobs[req.body.id]) {
//         // send in resp whatever you need
//         res.body = { done: true, /* toher stuff */}
//     } else {
//         res.boy = { done: false };
//     }
// })

const mp3dir = __dirname + '/CNN/Input/Raw/'
const mp3path = mp3dir + 'new.mp3'

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
    console.log('title: ' + metadata.common.title);
    console.log('artist: ' + metadata.common.artist);
    console.log('album: ' + metadata.common.album);
    console.log('year: ' + metadata.common.year);
    let machineBPM = await getBPM(mp3path);
    let prediction = await callCNN();
    let predictionArray = [prediction.Afrobeat, prediction['Brazilian Zouk'], prediction.Bachata, prediction.Kizomba];
    let predictionStr = 'let cnnArray = [' + predictionArray + '];';
    console.log(predictionStr)
    let machineBPMstr = 'let machineBPM = ' + machineBPM + ';';
    console.log(machineBPMstr)
    res.render('index', { 
        title: metadata.common.title,
        artist: metadata.common.artist,
        album: metadata.common.album,
        year: metadata.common.year,
        predictionArray: predictionStr,
        machineBPM: machineBPMstr
    });
});
//app.get('/cnnResults', callCNN);

app.listen(8000, function () {
    console.log('Server running on port 8000...');
})

// modularize this

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

// chart updates!
// Ask about managing post and get from different input sources. And how to avoid redirecting to a new URL
// async await, .then or what to manage app.post processes.