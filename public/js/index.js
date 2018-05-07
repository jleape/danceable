const BPM = require('bpm')
const FileSaver = require('file-saver');
const ID3Writer = require('browser-id3-writer')

// --- Playlists ---
let selectStyle = document.getElementById('selectStyle');
let spotifyList = document.getElementById('spotifyList');
let soundCloudList = document.getElementById('soundCloudList');
let youTubeList = document.getElementById('youTubeList');

// Spotify
let spotifyStrings = ['https://open.spotify.com/embed?uri=spotify:user:', ':playlist:', '&theme=white'];
let spotifyUser = '5yugugze9zb4k58w6jkdipe15';
let spotifyListTokens = {
    afrobeat: '3ZuOgGVFWmF2aH9pb6to1R&theme=white',
    bachata: '5h3aQpa8kUzsGoDEEqNFt7',
    brazilianZouk: '7g4uvM7ab7yNKNj9w7fS93',
    kizomba: '1bBboSMJp2kBxAx4vJ42kc'
};

// SoundCloud
let soundCloudStrings = ['https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/', 
'&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=false'];
let soundCloudListTokens = {
    afrobeat: '513507393',
    bachata: '513503037',
    brazilianZouk: '513501705',
    kizomba: '513505002'
};

//YouTube
let youTubeStrings = ["https://www.youtube.com/embed/?listType=playlist&list="];
let youTubeListTokens = {
    afrobeat: 'PLU_LO3ct2WS_RNyQ2B9LSo-hSO2qOMRZb',
    bachata: 'PLU_LO3ct2WS8-rwfeI3yrXyTLgX5V-u_O',
    brazilianZouk: 'PLU_LO3ct2WS_ZFkyc1Kb2NeHeUC9BBTP5',
    kizomba: 'PLU_LO3ct2WS89JHdMVf86qsJS62wTFVxK'
};

updatePlaylists = function(){
    spotifyList.src = spotifyStrings[0] + spotifyUser + spotifyStrings[1] + spotifyListTokens[selectStyle.value] + spotifyStrings[2];
    soundCloudList.src = soundCloudStrings[0] + soundCloudListTokens[selectStyle.value] + soundCloudStrings[1];
    youTubeList.src = youTubeStrings[0] + youTubeListTokens[selectStyle.value];
};

// --- Control Spectro Scroll ---
const slidingSpectro = document.getElementById('slidingSpectro.spectro');
const playButton = document.getElementById('playButton');
const player = document.getElementById('player');

player.addEventListener("play", function () {
    console.log('noticed play')
    console.log($('#slidingSpectro').css(animation))
    spectro.style.animationPlayState = 'running';
});
player.addEventListener("paused", function () {
    spectro.style.animationPlayState = 'paused';
});

// $("#playButton").click(() => {
//     if('play' == 'play'){
//         spectro.style.animationPlayState, 'running';
//     } else {
//         spectro.style.animationPlayState, 'paused';
//     }
// });

// --- BPM gauge ---
// Machine BPM
$("#circularGaugeContainer").dxCircularGauge({
    rangeContainer: { 
      offset: 10,
      ranges: [
        {startValue: 0, endValue: 60, color: 'grey'},
        {startValue: 60, endValue: 140, color: 'white'},
        {startValue: 140, endValue: 200, color: 'grey'}
      ]
    },
    scale: {
      startValue: 0,  endValue: 200,
      majorTick: { tickInterval: 20 },
      label: {
        format: 'number',
        fontColor: 'white'
      }
    },
    tooltip: {
      enabled: true,
      format: 'number',
          customizeText: function (arg) {
              return arg.valueText + ' BPM';
          }
      },
    value: machineBPM,
    animation: false
});

// Initial user BPM
$("#circularGaugeContainer_user").dxCircularGauge({
    rangeContainer: { 
      offset: 10,
      ranges: [
        {startValue: 0, endValue: 60, color: 'grey'},
        {startValue: 60, endValue: 140, color: 'white'},
        {startValue: 140, endValue: 200, color: 'grey'}
      ]
    },
    scale: {
      startValue: 0,  endValue: 200,
      majorTick: { tickInterval: 20 },
      label: {
        format: 'number',
        fontColor: 'white'
      }
    },
    tooltip: {
      enabled: true,
      format: 'number',
          customizeText: function (arg) {
              return arg.valueText + ' BPM';
          }
      },
    value: 0,
    animation: false
});

// reset BPM tap button
const bpmResetButton = document.getElementById('bpmResetButton');
$("#bpmResetButton").click(() => {
    b.reset();
    document.getElementById('bpmResetButton').value = 0;

    $("#circularGaugeContainer_user").dxCircularGauge({
        rangeContainer: { 
          offset: 10,
          ranges: [
            {startValue: 0, endValue: 60, color: 'grey'},
            {startValue: 60, endValue: 140, color: 'white'},
            {startValue: 140, endValue: 200, color: 'grey'}
          ]
        },
        scale: {
          startValue: 0,  endValue: 200,
          majorTick: { tickInterval: 20 },
          label: {
            format: 'number',
            fontColor: 'white'
          }
        },
        tooltip: {
          enabled: true,
          format: 'number',
              customizeText: function (arg) {
                  return arg.valueText + ' BPM';
              }
          },
        value: 0,
        animation: false
    });
});

// Set gauge to tap
const bpmButton = document.getElementById('bpmButton');
const b = new BPM();
$("#bpmButton").click(() => {
  b.tap();
  let inputBPMvalue = Math.round(b.tap().avg / 4);
  document.getElementById('bpmInput').value = inputBPMvalue;
  bpmButton.innerHTML = inputBPMvalue;

  $("#circularGaugeContainer_user").dxCircularGauge({
    rangeContainer: { 
      offset: 10,
      ranges: [
        {startValue: 0, endValue: 60, color: 'grey'},
        {startValue: 60, endValue: 140, color: 'white'},
        {startValue: 140, endValue: 200, color: 'grey'}
      ]
    },
    scale: {
      startValue: 0,  endValue: 200,
      majorTick: { tickInterval: 20 },
      label: {
        format: 'number',
        fontColor: 'white'
      }
    },
    tooltip: {
      enabled: true,
      format: 'number',
          customizeText: function (arg) {
              return arg.valueText + ' BPM';
          }
      },
    value: inputBPMvalue,
    animation: false
});
});

// --- CNN Bar Chart ---
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    position: "right",
    data: {
        /*labels: ["AFROBEAT", "BACHATA", "BRAZILIAN ZOUK", "KIZOMBA"],*/
        labels: [" ", " ", " ", " "],
        datasets: [{
            label: 'Score',
            data: cnnArray,
            backgroundColor: 'white'
        }]
    },
    options: {
        legend: {
        display: false
        },
        responsive: false,
        scales: {
            xAxes: [{
                ticks: {
                    reverse: true,
                    fontColor: "white",
                    fontSize: 12,
                    beginAtZero: true
                }
            }]
        }
    }
});

// --- User Feedback ---
// const submitFeedback = document.getElementById('submitFeedback');
// const inputMP3 = './CNN/Input/Raw/new.mp3';
// const outputMP3path = './CNN/Input/Corrected/';

// const title = document.getElementById('title');
// const artist = document.getElementById('artist');
// const album = document.getElementById('album');
// const year = document.getElementById('year');

// $("#submitFeedback").click(() => {

//     console.log('updating meta data')
//     // Browser

//     // // read array buffer
//     // const reader = new FileReader();
//     // reader.onload = function () {
//     //     const arrayBuffer = reader.result;
//     //     // go next
//     // };
//     // reader.onerror = function () {
//     //     // handle error
//     //     console.error('Reader error', reader.error);
//     // };
//     // reader.readAsArrayBuffer(inputMP3);

//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', inputMP3, true);
//     xhr.responseType = 'arraybuffer';
//     xhr.onload = function () {
//         if (xhr.status === 200) {
//             let arrayBuffer = xhr.response;
//             // go next
//         } else {
//             // handle error
//             console.error(xhr.statusText + ' (' + xhr.status + ')');
//         }
//     };
//     xhr.onerror = function() {
//         // handle error
//         console.error('Network error');
//     };
//     xhr.send();

//     // write new tags
//     const writer = new ID3Writer(arrayBuffer);
//     writer.setFrame('TIT2', title)
//         .setFrame('TPE1', artist)
//         .setFrame('TALB', album)
//         .setFrame('TYER', year)
//         .setFrame('TBPM', b.tap().avg / 2);
//     writer.addTag();

//     const taggedSongBuffer = writer.arrayBuffer;
//     const blob = writer.getBlob();
//     const url = writer.getURL();
//     FileSaver.saveAs(blob, outputMP3path + title + '.mp3');

//     mp3download = getElementById('mp3download');
//     mp3download.href = 'CNN/Input/Corrected/' + title + 'mp3';

    // Node
    // const songBuffer = fs.readFileSync(inputMP3);
    // const writer = new ID3Writer(songBuffer);

    // writer.setFrame('TIT2', title)
    //     .setFrame('TPE1', artist)
    //     .setFrame('TALB', album)
    //     .setFrame('TYER', year)
    //     .setFrame('TBPM', b.tap().avg / 2);
    // writer.addTag();

    // const taggedSongBuffer = Buffer.from(writer.arrayBuffer);
    // fs.writeFileSync(outputMP3path + title + '.mp3', taggedSongBuffer);
// });