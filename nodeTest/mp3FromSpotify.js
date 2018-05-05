require('ffmpeg');
const downloader = require('spotify-mp3-playlist-downloader');

downloader.downloadPlaylist(function (err){
  if (err){
    console.log("download failed");
  }else{
    console.log("playlist download succeeded");
  }
})