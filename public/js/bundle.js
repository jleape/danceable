(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Calculate BPM
 */

if (typeof exports !== 'undefined') {
  module.exports = BPM;
  module.exports.BPM = BPM;
}

function BPM() {
  this.count = 0;
  this.ts = 0;
  this.old_ts = 0;
}

BPM.prototype.tap = function() {
  this.ts = Date.now();
  if (!this.first_ts) this.first_ts = this.ts;

  var ret = {};

  // ignore the first tap
  if (this.old_ts) {
    var ms = this.ts - this.old_ts;

    var avg = 60000 * this.count / (this.ts - this.first_ts);

    ret.avg = avg;
    ret.ms = ms;
  }

  ret.count = ++this.count;

  // Store the old timestamp
  this.old_ts = this.ts;
  return ret;
};

BPM.prototype.reset = function() {
  this.count = 0;
  this.ts = 0;
  this.old_ts = 0;
  this.first_ts = 0;
};

},{}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.ID3Writer=t()}(this,function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e){return String(e).split("").map(function(e){return e.charCodeAt(0)})}function r(e){return new Uint8Array(t(e))}function n(e){var r=new Uint8Array(2*e.length);return new Uint16Array(r.buffer).set(t(e)),r}function a(e){return 73===e[0]&&68===e[1]&&51===e[2]}function i(e){if(!e||!e.length)return null;if(255===e[0]&&216===e[1]&&255===e[2])return"image/jpeg";if(137===e[0]&&80===e[1]&&78===e[2]&&71===e[3])return"image/png";if(71===e[0]&&73===e[1]&&70===e[2])return"image/gif";if(87===e[8]&&69===e[9]&&66===e[10]&&80===e[11])return"image/webp";var t=73===e[0]&&73===e[1]&&42===e[2]&&0===e[3],r=77===e[0]&&77===e[1]&&0===e[2]&&42===e[3];return t||r?"image/tiff":66===e[0]&&77===e[1]?"image/bmp":0===e[0]&&0===e[1]&&1===e[2]&&0===e[3]?"image/x-icon":null}function s(e){return[e>>>24&255,e>>>16&255,e>>>8&255,255&e]}function o(e){return[e>>>21&127,e>>>14&127,e>>>7&127,127&e]}function c(e){return(e[0]<<21)+(e[1]<<14)+(e[2]<<7)+e[3]}function u(e){return 11+e}function f(e){return 13+2*e}function h(e,t){return 16+2*e+2+2+2*t}function p(e,t,r,n){return 11+t+1+1+(n?2+2*(r+1):r+1)+e}function l(e,t){return 16+2*e+2+2+2*t}function g(e,t){return 13+2*e+2+2+2*t}function m(e){return 10+e}return function(){function t(r){if(e(this,t),!(r&&"object"==typeof r&&"byteLength"in r))throw new Error("First argument should be an instance of ArrayBuffer or Buffer");this.arrayBuffer=r,this.padding=4096,this.frames=[],this.url=""}return t.prototype._setIntegerFrame=function(e,t){var r=parseInt(t,10);this.frames.push({name:e,value:r,size:u(r.toString().length)})},t.prototype._setStringFrame=function(e,t){var r=t.toString();this.frames.push({name:e,value:r,size:f(r.length)})},t.prototype._setPictureFrame=function(e,t,r,n){var a=i(new Uint8Array(t)),s=r.toString();if(!a)throw new Error("Unknown picture MIME type");r||(n=!1),this.frames.push({name:"APIC",value:t,pictureType:e,mimeType:a,useUnicodeEncoding:n,description:s,size:p(t.byteLength,a.length,s.length,n)})},t.prototype._setLyricsFrame=function(e,t){var r=e.toString(),n=t.toString();this.frames.push({name:"USLT",value:n,description:r,size:h(r.length,n.length)})},t.prototype._setCommentFrame=function(e,t){var r=e.toString(),n=t.toString();this.frames.push({name:"COMM",value:n,description:r,size:l(r.length,n.length)})},t.prototype._setUserStringFrame=function(e,t){var r=e.toString(),n=t.toString();this.frames.push({name:"TXXX",description:r,value:n,size:g(r.length,n.length)})},t.prototype._setUrlLinkFrame=function(e,t){var r=t.toString();this.frames.push({name:e,value:r,size:m(r.length)})},t.prototype.setFrame=function(e,t){switch(e){case"TPE1":case"TCOM":case"TCON":if(!Array.isArray(t))throw new Error(e+" frame value should be an array of strings");var r="TCON"===e?";":"/",n=t.join(r);this._setStringFrame(e,n);break;case"TIT2":case"TALB":case"TPE2":case"TPE3":case"TPE4":case"TRCK":case"TPOS":case"TMED":case"TPUB":this._setStringFrame(e,t);break;case"TBPM":case"TLEN":case"TYER":this._setIntegerFrame(e,t);break;case"USLT":if(!("object"==typeof t&&"description"in t&&"lyrics"in t))throw new Error("USLT frame value should be an object with keys description and lyrics");this._setLyricsFrame(t.description,t.lyrics);break;case"APIC":if(!("object"==typeof t&&"type"in t&&"data"in t&&"description"in t))throw new Error("APIC frame value should be an object with keys type, data and description");if(t.type<0||t.type>20)throw new Error("Incorrect APIC frame picture type");this._setPictureFrame(t.type,t.data,t.description,!!t.useUnicodeEncoding);break;case"TXXX":if(!("object"==typeof t&&"description"in t&&"value"in t))throw new Error("TXXX frame value should be an object with keys description and value");this._setUserStringFrame(t.description,t.value);break;case"TKEY":if(!/^([A-G][#b]?m?|o)$/.test(t))throw new Error(e+" frame value should be like Dbm, C#, B or o");this._setStringFrame(e,t);break;case"WCOM":case"WCOP":case"WOAF":case"WOAR":case"WOAS":case"WORS":case"WPAY":case"WPUB":this._setUrlLinkFrame(e,t);break;case"COMM":if(!("object"==typeof t&&"description"in t&&"text"in t))throw new Error("COMM frame value should be an object with keys description and text");this._setCommentFrame(t.description,t.text);break;default:throw new Error("Unsupported frame "+e)}return this},t.prototype.removeTag=function(){if(!(this.arrayBuffer.byteLength<10)){var e=new Uint8Array(this.arrayBuffer),t=e[3],r=c([e[6],e[7],e[8],e[9]])+10;!a(e)||t<2||t>4||(this.arrayBuffer=new Uint8Array(e.subarray(r)).buffer)}},t.prototype.addTag=function(){this.removeTag();var e=[255,254],t=[101,110,103],a=10+this.frames.reduce(function(e,t){return e+t.size},0)+this.padding,i=new ArrayBuffer(this.arrayBuffer.byteLength+a),c=new Uint8Array(i),u=0,f=[];return f=[73,68,51,3],c.set(f,u),u+=f.length,u++,u++,f=o(a-10),c.set(f,u),u+=f.length,this.frames.forEach(function(a){switch(f=r(a.name),c.set(f,u),u+=f.length,f=s(a.size-10),c.set(f,u),u+=f.length,u+=2,a.name){case"WCOM":case"WCOP":case"WOAF":case"WOAR":case"WOAS":case"WORS":case"WPAY":case"WPUB":f=r(a.value),c.set(f,u),u+=f.length;break;case"TPE1":case"TCOM":case"TCON":case"TIT2":case"TALB":case"TPE2":case"TPE3":case"TPE4":case"TRCK":case"TPOS":case"TKEY":case"TMED":case"TPUB":f=[1].concat(e),c.set(f,u),u+=f.length,f=n(a.value),c.set(f,u),u+=f.length;break;case"TXXX":case"USLT":case"COMM":f=[1],"USLT"!==a.name&&"COMM"!==a.name||(f=f.concat(t)),f=f.concat(e),c.set(f,u),u+=f.length,f=n(a.description),c.set(f,u),u+=f.length,f=[0,0].concat(e),c.set(f,u),u+=f.length,f=n(a.value),c.set(f,u),u+=f.length;break;case"TBPM":case"TLEN":case"TYER":u++,f=r(a.value),c.set(f,u),u+=f.length;break;case"APIC":f=[a.useUnicodeEncoding?1:0],c.set(f,u),u+=f.length,f=r(a.mimeType),c.set(f,u),u+=f.length,f=[0,a.pictureType],c.set(f,u),u+=f.length,a.useUnicodeEncoding?(f=[].concat(e),c.set(f,u),u+=f.length,f=n(a.description),c.set(f,u),u+=f.length,u+=2):(f=r(a.description),c.set(f,u),u+=f.length,u++),c.set(new Uint8Array(a.value),u),u+=a.value.byteLength}}),u+=this.padding,c.set(new Uint8Array(this.arrayBuffer),u),this.arrayBuffer=i,i},t.prototype.getBlob=function(){return new Blob([this.arrayBuffer],{type:"audio/mpeg"})},t.prototype.getURL=function(){return this.url||(this.url=URL.createObjectURL(this.getBlob())),this.url},t.prototype.revokeURL=function(){URL.revokeObjectURL(this.url)},t}()});
},{}],3:[function(require,module,exports){
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd !== null)) {
  define("FileSaver.js", function() {
    return saveAs;
  });
}

},{}],4:[function(require,module,exports){
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
},{"bpm":1,"browser-id3-writer":2,"file-saver":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm5vZGVfbW9kdWxlcy9icG0vYnBtLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItaWQzLXdyaXRlci9kaXN0L2Jyb3dzZXItaWQzLXdyaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9maWxlLXNhdmVyL0ZpbGVTYXZlci5qcyIsInB1YmxpYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxuICogQ2FsY3VsYXRlIEJQTVxuICovXG5cbmlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBCUE07XG4gIG1vZHVsZS5leHBvcnRzLkJQTSA9IEJQTTtcbn1cblxuZnVuY3Rpb24gQlBNKCkge1xuICB0aGlzLmNvdW50ID0gMDtcbiAgdGhpcy50cyA9IDA7XG4gIHRoaXMub2xkX3RzID0gMDtcbn1cblxuQlBNLnByb3RvdHlwZS50YXAgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy50cyA9IERhdGUubm93KCk7XG4gIGlmICghdGhpcy5maXJzdF90cykgdGhpcy5maXJzdF90cyA9IHRoaXMudHM7XG5cbiAgdmFyIHJldCA9IHt9O1xuXG4gIC8vIGlnbm9yZSB0aGUgZmlyc3QgdGFwXG4gIGlmICh0aGlzLm9sZF90cykge1xuICAgIHZhciBtcyA9IHRoaXMudHMgLSB0aGlzLm9sZF90cztcblxuICAgIHZhciBhdmcgPSA2MDAwMCAqIHRoaXMuY291bnQgLyAodGhpcy50cyAtIHRoaXMuZmlyc3RfdHMpO1xuXG4gICAgcmV0LmF2ZyA9IGF2ZztcbiAgICByZXQubXMgPSBtcztcbiAgfVxuXG4gIHJldC5jb3VudCA9ICsrdGhpcy5jb3VudDtcblxuICAvLyBTdG9yZSB0aGUgb2xkIHRpbWVzdGFtcFxuICB0aGlzLm9sZF90cyA9IHRoaXMudHM7XG4gIHJldHVybiByZXQ7XG59O1xuXG5CUE0ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY291bnQgPSAwO1xuICB0aGlzLnRzID0gMDtcbiAgdGhpcy5vbGRfdHMgPSAwO1xuICB0aGlzLmZpcnN0X3RzID0gMDtcbn07XG4iLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTplLklEM1dyaXRlcj10KCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKGUsdCl7aWYoIShlIGluc3RhbmNlb2YgdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1mdW5jdGlvbiB0KGUpe3JldHVybiBTdHJpbmcoZSkuc3BsaXQoXCJcIikubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBlLmNoYXJDb2RlQXQoMCl9KX1mdW5jdGlvbiByKGUpe3JldHVybiBuZXcgVWludDhBcnJheSh0KGUpKX1mdW5jdGlvbiBuKGUpe3ZhciByPW5ldyBVaW50OEFycmF5KDIqZS5sZW5ndGgpO3JldHVybiBuZXcgVWludDE2QXJyYXkoci5idWZmZXIpLnNldCh0KGUpKSxyfWZ1bmN0aW9uIGEoZSl7cmV0dXJuIDczPT09ZVswXSYmNjg9PT1lWzFdJiY1MT09PWVbMl19ZnVuY3Rpb24gaShlKXtpZighZXx8IWUubGVuZ3RoKXJldHVybiBudWxsO2lmKDI1NT09PWVbMF0mJjIxNj09PWVbMV0mJjI1NT09PWVbMl0pcmV0dXJuXCJpbWFnZS9qcGVnXCI7aWYoMTM3PT09ZVswXSYmODA9PT1lWzFdJiY3OD09PWVbMl0mJjcxPT09ZVszXSlyZXR1cm5cImltYWdlL3BuZ1wiO2lmKDcxPT09ZVswXSYmNzM9PT1lWzFdJiY3MD09PWVbMl0pcmV0dXJuXCJpbWFnZS9naWZcIjtpZig4Nz09PWVbOF0mJjY5PT09ZVs5XSYmNjY9PT1lWzEwXSYmODA9PT1lWzExXSlyZXR1cm5cImltYWdlL3dlYnBcIjt2YXIgdD03Mz09PWVbMF0mJjczPT09ZVsxXSYmNDI9PT1lWzJdJiYwPT09ZVszXSxyPTc3PT09ZVswXSYmNzc9PT1lWzFdJiYwPT09ZVsyXSYmNDI9PT1lWzNdO3JldHVybiB0fHxyP1wiaW1hZ2UvdGlmZlwiOjY2PT09ZVswXSYmNzc9PT1lWzFdP1wiaW1hZ2UvYm1wXCI6MD09PWVbMF0mJjA9PT1lWzFdJiYxPT09ZVsyXSYmMD09PWVbM10/XCJpbWFnZS94LWljb25cIjpudWxsfWZ1bmN0aW9uIHMoZSl7cmV0dXJuW2U+Pj4yNCYyNTUsZT4+PjE2JjI1NSxlPj4+OCYyNTUsMjU1JmVdfWZ1bmN0aW9uIG8oZSl7cmV0dXJuW2U+Pj4yMSYxMjcsZT4+PjE0JjEyNyxlPj4+NyYxMjcsMTI3JmVdfWZ1bmN0aW9uIGMoZSl7cmV0dXJuKGVbMF08PDIxKSsoZVsxXTw8MTQpKyhlWzJdPDw3KStlWzNdfWZ1bmN0aW9uIHUoZSl7cmV0dXJuIDExK2V9ZnVuY3Rpb24gZihlKXtyZXR1cm4gMTMrMiplfWZ1bmN0aW9uIGgoZSx0KXtyZXR1cm4gMTYrMiplKzIrMisyKnR9ZnVuY3Rpb24gcChlLHQscixuKXtyZXR1cm4gMTErdCsxKzErKG4/MisyKihyKzEpOnIrMSkrZX1mdW5jdGlvbiBsKGUsdCl7cmV0dXJuIDE2KzIqZSsyKzIrMip0fWZ1bmN0aW9uIGcoZSx0KXtyZXR1cm4gMTMrMiplKzIrMisyKnR9ZnVuY3Rpb24gbShlKXtyZXR1cm4gMTArZX1yZXR1cm4gZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHIpe2lmKGUodGhpcyx0KSwhKHImJlwib2JqZWN0XCI9PXR5cGVvZiByJiZcImJ5dGVMZW5ndGhcImluIHIpKXRocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZ3VtZW50IHNob3VsZCBiZSBhbiBpbnN0YW5jZSBvZiBBcnJheUJ1ZmZlciBvciBCdWZmZXJcIik7dGhpcy5hcnJheUJ1ZmZlcj1yLHRoaXMucGFkZGluZz00MDk2LHRoaXMuZnJhbWVzPVtdLHRoaXMudXJsPVwiXCJ9cmV0dXJuIHQucHJvdG90eXBlLl9zZXRJbnRlZ2VyRnJhbWU9ZnVuY3Rpb24oZSx0KXt2YXIgcj1wYXJzZUludCh0LDEwKTt0aGlzLmZyYW1lcy5wdXNoKHtuYW1lOmUsdmFsdWU6cixzaXplOnUoci50b1N0cmluZygpLmxlbmd0aCl9KX0sdC5wcm90b3R5cGUuX3NldFN0cmluZ0ZyYW1lPWZ1bmN0aW9uKGUsdCl7dmFyIHI9dC50b1N0cmluZygpO3RoaXMuZnJhbWVzLnB1c2goe25hbWU6ZSx2YWx1ZTpyLHNpemU6ZihyLmxlbmd0aCl9KX0sdC5wcm90b3R5cGUuX3NldFBpY3R1cmVGcmFtZT1mdW5jdGlvbihlLHQscixuKXt2YXIgYT1pKG5ldyBVaW50OEFycmF5KHQpKSxzPXIudG9TdHJpbmcoKTtpZighYSl0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHBpY3R1cmUgTUlNRSB0eXBlXCIpO3J8fChuPSExKSx0aGlzLmZyYW1lcy5wdXNoKHtuYW1lOlwiQVBJQ1wiLHZhbHVlOnQscGljdHVyZVR5cGU6ZSxtaW1lVHlwZTphLHVzZVVuaWNvZGVFbmNvZGluZzpuLGRlc2NyaXB0aW9uOnMsc2l6ZTpwKHQuYnl0ZUxlbmd0aCxhLmxlbmd0aCxzLmxlbmd0aCxuKX0pfSx0LnByb3RvdHlwZS5fc2V0THlyaWNzRnJhbWU9ZnVuY3Rpb24oZSx0KXt2YXIgcj1lLnRvU3RyaW5nKCksbj10LnRvU3RyaW5nKCk7dGhpcy5mcmFtZXMucHVzaCh7bmFtZTpcIlVTTFRcIix2YWx1ZTpuLGRlc2NyaXB0aW9uOnIsc2l6ZTpoKHIubGVuZ3RoLG4ubGVuZ3RoKX0pfSx0LnByb3RvdHlwZS5fc2V0Q29tbWVudEZyYW1lPWZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS50b1N0cmluZygpLG49dC50b1N0cmluZygpO3RoaXMuZnJhbWVzLnB1c2goe25hbWU6XCJDT01NXCIsdmFsdWU6bixkZXNjcmlwdGlvbjpyLHNpemU6bChyLmxlbmd0aCxuLmxlbmd0aCl9KX0sdC5wcm90b3R5cGUuX3NldFVzZXJTdHJpbmdGcmFtZT1mdW5jdGlvbihlLHQpe3ZhciByPWUudG9TdHJpbmcoKSxuPXQudG9TdHJpbmcoKTt0aGlzLmZyYW1lcy5wdXNoKHtuYW1lOlwiVFhYWFwiLGRlc2NyaXB0aW9uOnIsdmFsdWU6bixzaXplOmcoci5sZW5ndGgsbi5sZW5ndGgpfSl9LHQucHJvdG90eXBlLl9zZXRVcmxMaW5rRnJhbWU9ZnVuY3Rpb24oZSx0KXt2YXIgcj10LnRvU3RyaW5nKCk7dGhpcy5mcmFtZXMucHVzaCh7bmFtZTplLHZhbHVlOnIsc2l6ZTptKHIubGVuZ3RoKX0pfSx0LnByb3RvdHlwZS5zZXRGcmFtZT1mdW5jdGlvbihlLHQpe3N3aXRjaChlKXtjYXNlXCJUUEUxXCI6Y2FzZVwiVENPTVwiOmNhc2VcIlRDT05cIjppZighQXJyYXkuaXNBcnJheSh0KSl0aHJvdyBuZXcgRXJyb3IoZStcIiBmcmFtZSB2YWx1ZSBzaG91bGQgYmUgYW4gYXJyYXkgb2Ygc3RyaW5nc1wiKTt2YXIgcj1cIlRDT05cIj09PWU/XCI7XCI6XCIvXCIsbj10LmpvaW4ocik7dGhpcy5fc2V0U3RyaW5nRnJhbWUoZSxuKTticmVhaztjYXNlXCJUSVQyXCI6Y2FzZVwiVEFMQlwiOmNhc2VcIlRQRTJcIjpjYXNlXCJUUEUzXCI6Y2FzZVwiVFBFNFwiOmNhc2VcIlRSQ0tcIjpjYXNlXCJUUE9TXCI6Y2FzZVwiVE1FRFwiOmNhc2VcIlRQVUJcIjp0aGlzLl9zZXRTdHJpbmdGcmFtZShlLHQpO2JyZWFrO2Nhc2VcIlRCUE1cIjpjYXNlXCJUTEVOXCI6Y2FzZVwiVFlFUlwiOnRoaXMuX3NldEludGVnZXJGcmFtZShlLHQpO2JyZWFrO2Nhc2VcIlVTTFRcIjppZighKFwib2JqZWN0XCI9PXR5cGVvZiB0JiZcImRlc2NyaXB0aW9uXCJpbiB0JiZcImx5cmljc1wiaW4gdCkpdGhyb3cgbmV3IEVycm9yKFwiVVNMVCBmcmFtZSB2YWx1ZSBzaG91bGQgYmUgYW4gb2JqZWN0IHdpdGgga2V5cyBkZXNjcmlwdGlvbiBhbmQgbHlyaWNzXCIpO3RoaXMuX3NldEx5cmljc0ZyYW1lKHQuZGVzY3JpcHRpb24sdC5seXJpY3MpO2JyZWFrO2Nhc2VcIkFQSUNcIjppZighKFwib2JqZWN0XCI9PXR5cGVvZiB0JiZcInR5cGVcImluIHQmJlwiZGF0YVwiaW4gdCYmXCJkZXNjcmlwdGlvblwiaW4gdCkpdGhyb3cgbmV3IEVycm9yKFwiQVBJQyBmcmFtZSB2YWx1ZSBzaG91bGQgYmUgYW4gb2JqZWN0IHdpdGgga2V5cyB0eXBlLCBkYXRhIGFuZCBkZXNjcmlwdGlvblwiKTtpZih0LnR5cGU8MHx8dC50eXBlPjIwKXRocm93IG5ldyBFcnJvcihcIkluY29ycmVjdCBBUElDIGZyYW1lIHBpY3R1cmUgdHlwZVwiKTt0aGlzLl9zZXRQaWN0dXJlRnJhbWUodC50eXBlLHQuZGF0YSx0LmRlc2NyaXB0aW9uLCEhdC51c2VVbmljb2RlRW5jb2RpbmcpO2JyZWFrO2Nhc2VcIlRYWFhcIjppZighKFwib2JqZWN0XCI9PXR5cGVvZiB0JiZcImRlc2NyaXB0aW9uXCJpbiB0JiZcInZhbHVlXCJpbiB0KSl0aHJvdyBuZXcgRXJyb3IoXCJUWFhYIGZyYW1lIHZhbHVlIHNob3VsZCBiZSBhbiBvYmplY3Qgd2l0aCBrZXlzIGRlc2NyaXB0aW9uIGFuZCB2YWx1ZVwiKTt0aGlzLl9zZXRVc2VyU3RyaW5nRnJhbWUodC5kZXNjcmlwdGlvbix0LnZhbHVlKTticmVhaztjYXNlXCJUS0VZXCI6aWYoIS9eKFtBLUddWyNiXT9tP3xvKSQvLnRlc3QodCkpdGhyb3cgbmV3IEVycm9yKGUrXCIgZnJhbWUgdmFsdWUgc2hvdWxkIGJlIGxpa2UgRGJtLCBDIywgQiBvciBvXCIpO3RoaXMuX3NldFN0cmluZ0ZyYW1lKGUsdCk7YnJlYWs7Y2FzZVwiV0NPTVwiOmNhc2VcIldDT1BcIjpjYXNlXCJXT0FGXCI6Y2FzZVwiV09BUlwiOmNhc2VcIldPQVNcIjpjYXNlXCJXT1JTXCI6Y2FzZVwiV1BBWVwiOmNhc2VcIldQVUJcIjp0aGlzLl9zZXRVcmxMaW5rRnJhbWUoZSx0KTticmVhaztjYXNlXCJDT01NXCI6aWYoIShcIm9iamVjdFwiPT10eXBlb2YgdCYmXCJkZXNjcmlwdGlvblwiaW4gdCYmXCJ0ZXh0XCJpbiB0KSl0aHJvdyBuZXcgRXJyb3IoXCJDT01NIGZyYW1lIHZhbHVlIHNob3VsZCBiZSBhbiBvYmplY3Qgd2l0aCBrZXlzIGRlc2NyaXB0aW9uIGFuZCB0ZXh0XCIpO3RoaXMuX3NldENvbW1lbnRGcmFtZSh0LmRlc2NyaXB0aW9uLHQudGV4dCk7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBmcmFtZSBcIitlKX1yZXR1cm4gdGhpc30sdC5wcm90b3R5cGUucmVtb3ZlVGFnPWZ1bmN0aW9uKCl7aWYoISh0aGlzLmFycmF5QnVmZmVyLmJ5dGVMZW5ndGg8MTApKXt2YXIgZT1uZXcgVWludDhBcnJheSh0aGlzLmFycmF5QnVmZmVyKSx0PWVbM10scj1jKFtlWzZdLGVbN10sZVs4XSxlWzldXSkrMTA7IWEoZSl8fHQ8Mnx8dD40fHwodGhpcy5hcnJheUJ1ZmZlcj1uZXcgVWludDhBcnJheShlLnN1YmFycmF5KHIpKS5idWZmZXIpfX0sdC5wcm90b3R5cGUuYWRkVGFnPWZ1bmN0aW9uKCl7dGhpcy5yZW1vdmVUYWcoKTt2YXIgZT1bMjU1LDI1NF0sdD1bMTAxLDExMCwxMDNdLGE9MTArdGhpcy5mcmFtZXMucmVkdWNlKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUrdC5zaXplfSwwKSt0aGlzLnBhZGRpbmcsaT1uZXcgQXJyYXlCdWZmZXIodGhpcy5hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoK2EpLGM9bmV3IFVpbnQ4QXJyYXkoaSksdT0wLGY9W107cmV0dXJuIGY9WzczLDY4LDUxLDNdLGMuc2V0KGYsdSksdSs9Zi5sZW5ndGgsdSsrLHUrKyxmPW8oYS0xMCksYy5zZXQoZix1KSx1Kz1mLmxlbmd0aCx0aGlzLmZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGEpe3N3aXRjaChmPXIoYS5uYW1lKSxjLnNldChmLHUpLHUrPWYubGVuZ3RoLGY9cyhhLnNpemUtMTApLGMuc2V0KGYsdSksdSs9Zi5sZW5ndGgsdSs9MixhLm5hbWUpe2Nhc2VcIldDT01cIjpjYXNlXCJXQ09QXCI6Y2FzZVwiV09BRlwiOmNhc2VcIldPQVJcIjpjYXNlXCJXT0FTXCI6Y2FzZVwiV09SU1wiOmNhc2VcIldQQVlcIjpjYXNlXCJXUFVCXCI6Zj1yKGEudmFsdWUpLGMuc2V0KGYsdSksdSs9Zi5sZW5ndGg7YnJlYWs7Y2FzZVwiVFBFMVwiOmNhc2VcIlRDT01cIjpjYXNlXCJUQ09OXCI6Y2FzZVwiVElUMlwiOmNhc2VcIlRBTEJcIjpjYXNlXCJUUEUyXCI6Y2FzZVwiVFBFM1wiOmNhc2VcIlRQRTRcIjpjYXNlXCJUUkNLXCI6Y2FzZVwiVFBPU1wiOmNhc2VcIlRLRVlcIjpjYXNlXCJUTUVEXCI6Y2FzZVwiVFBVQlwiOmY9WzFdLmNvbmNhdChlKSxjLnNldChmLHUpLHUrPWYubGVuZ3RoLGY9bihhLnZhbHVlKSxjLnNldChmLHUpLHUrPWYubGVuZ3RoO2JyZWFrO2Nhc2VcIlRYWFhcIjpjYXNlXCJVU0xUXCI6Y2FzZVwiQ09NTVwiOmY9WzFdLFwiVVNMVFwiIT09YS5uYW1lJiZcIkNPTU1cIiE9PWEubmFtZXx8KGY9Zi5jb25jYXQodCkpLGY9Zi5jb25jYXQoZSksYy5zZXQoZix1KSx1Kz1mLmxlbmd0aCxmPW4oYS5kZXNjcmlwdGlvbiksYy5zZXQoZix1KSx1Kz1mLmxlbmd0aCxmPVswLDBdLmNvbmNhdChlKSxjLnNldChmLHUpLHUrPWYubGVuZ3RoLGY9bihhLnZhbHVlKSxjLnNldChmLHUpLHUrPWYubGVuZ3RoO2JyZWFrO2Nhc2VcIlRCUE1cIjpjYXNlXCJUTEVOXCI6Y2FzZVwiVFlFUlwiOnUrKyxmPXIoYS52YWx1ZSksYy5zZXQoZix1KSx1Kz1mLmxlbmd0aDticmVhaztjYXNlXCJBUElDXCI6Zj1bYS51c2VVbmljb2RlRW5jb2Rpbmc/MTowXSxjLnNldChmLHUpLHUrPWYubGVuZ3RoLGY9cihhLm1pbWVUeXBlKSxjLnNldChmLHUpLHUrPWYubGVuZ3RoLGY9WzAsYS5waWN0dXJlVHlwZV0sYy5zZXQoZix1KSx1Kz1mLmxlbmd0aCxhLnVzZVVuaWNvZGVFbmNvZGluZz8oZj1bXS5jb25jYXQoZSksYy5zZXQoZix1KSx1Kz1mLmxlbmd0aCxmPW4oYS5kZXNjcmlwdGlvbiksYy5zZXQoZix1KSx1Kz1mLmxlbmd0aCx1Kz0yKTooZj1yKGEuZGVzY3JpcHRpb24pLGMuc2V0KGYsdSksdSs9Zi5sZW5ndGgsdSsrKSxjLnNldChuZXcgVWludDhBcnJheShhLnZhbHVlKSx1KSx1Kz1hLnZhbHVlLmJ5dGVMZW5ndGh9fSksdSs9dGhpcy5wYWRkaW5nLGMuc2V0KG5ldyBVaW50OEFycmF5KHRoaXMuYXJyYXlCdWZmZXIpLHUpLHRoaXMuYXJyYXlCdWZmZXI9aSxpfSx0LnByb3RvdHlwZS5nZXRCbG9iPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBCbG9iKFt0aGlzLmFycmF5QnVmZmVyXSx7dHlwZTpcImF1ZGlvL21wZWdcIn0pfSx0LnByb3RvdHlwZS5nZXRVUkw9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51cmx8fCh0aGlzLnVybD1VUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMuZ2V0QmxvYigpKSksdGhpcy51cmx9LHQucHJvdG90eXBlLnJldm9rZVVSTD1mdW5jdGlvbigpe1VSTC5yZXZva2VPYmplY3RVUkwodGhpcy51cmwpfSx0fSgpfSk7IiwiLyogRmlsZVNhdmVyLmpzXG4gKiBBIHNhdmVBcygpIEZpbGVTYXZlciBpbXBsZW1lbnRhdGlvbi5cbiAqIDEuMy4yXG4gKiAyMDE2LTA2LTE2IDE4OjI1OjE5XG4gKlxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuICogTGljZW5zZTogTUlUXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5cbi8qZ2xvYmFsIHNlbGYgKi9cbi8qanNsaW50IGJpdHdpc2U6IHRydWUsIGluZGVudDogNCwgbGF4YnJlYWs6IHRydWUsIGxheGNvbW1hOiB0cnVlLCBzbWFydHRhYnM6IHRydWUsIHBsdXNwbHVzOiB0cnVlICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvRmlsZVNhdmVyLmpzICovXG5cbnZhciBzYXZlQXMgPSBzYXZlQXMgfHwgKGZ1bmN0aW9uKHZpZXcpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8vIElFIDwxMCBpcyBleHBsaWNpdGx5IHVuc3VwcG9ydGVkXG5cdGlmICh0eXBlb2YgdmlldyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIC9NU0lFIFsxLTldXFwuLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhclxuXHRcdCAgZG9jID0gdmlldy5kb2N1bWVudFxuXHRcdCAgLy8gb25seSBnZXQgVVJMIHdoZW4gbmVjZXNzYXJ5IGluIGNhc2UgQmxvYi5qcyBoYXNuJ3Qgb3ZlcnJpZGRlbiBpdCB5ZXRcblx0XHQsIGdldF9VUkwgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB2aWV3LlVSTCB8fCB2aWV3LndlYmtpdFVSTCB8fCB2aWV3O1xuXHRcdH1cblx0XHQsIHNhdmVfbGluayA9IGRvYy5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsIFwiYVwiKVxuXHRcdCwgY2FuX3VzZV9zYXZlX2xpbmsgPSBcImRvd25sb2FkXCIgaW4gc2F2ZV9saW5rXG5cdFx0LCBjbGljayA9IGZ1bmN0aW9uKG5vZGUpIHtcblx0XHRcdHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIik7XG5cdFx0XHRub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH1cblx0XHQsIGlzX3NhZmFyaSA9IC9jb25zdHJ1Y3Rvci9pLnRlc3Qodmlldy5IVE1MRWxlbWVudCkgfHwgdmlldy5zYWZhcmlcblx0XHQsIGlzX2Nocm9tZV9pb3MgPS9DcmlPU1xcL1tcXGRdKy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxuXHRcdCwgdGhyb3dfb3V0c2lkZSA9IGZ1bmN0aW9uKGV4KSB7XG5cdFx0XHQodmlldy5zZXRJbW1lZGlhdGUgfHwgdmlldy5zZXRUaW1lb3V0KShmdW5jdGlvbigpIHtcblx0XHRcdFx0dGhyb3cgZXg7XG5cdFx0XHR9LCAwKTtcblx0XHR9XG5cdFx0LCBmb3JjZV9zYXZlYWJsZV90eXBlID0gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIlxuXHRcdC8vIHRoZSBCbG9iIEFQSSBpcyBmdW5kYW1lbnRhbGx5IGJyb2tlbiBhcyB0aGVyZSBpcyBubyBcImRvd25sb2FkZmluaXNoZWRcIiBldmVudCB0byBzdWJzY3JpYmUgdG9cblx0XHQsIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCA9IDEwMDAgKiA0MCAvLyBpbiBtc1xuXHRcdCwgcmV2b2tlID0gZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0dmFyIHJldm9rZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmaWxlID09PSBcInN0cmluZ1wiKSB7IC8vIGZpbGUgaXMgYW4gb2JqZWN0IFVSTFxuXHRcdFx0XHRcdGdldF9VUkwoKS5yZXZva2VPYmplY3RVUkwoZmlsZSk7XG5cdFx0XHRcdH0gZWxzZSB7IC8vIGZpbGUgaXMgYSBGaWxlXG5cdFx0XHRcdFx0ZmlsZS5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHNldFRpbWVvdXQocmV2b2tlciwgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0KTtcblx0XHR9XG5cdFx0LCBkaXNwYXRjaCA9IGZ1bmN0aW9uKGZpbGVzYXZlciwgZXZlbnRfdHlwZXMsIGV2ZW50KSB7XG5cdFx0XHRldmVudF90eXBlcyA9IFtdLmNvbmNhdChldmVudF90eXBlcyk7XG5cdFx0XHR2YXIgaSA9IGV2ZW50X3R5cGVzLmxlbmd0aDtcblx0XHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdFx0dmFyIGxpc3RlbmVyID0gZmlsZXNhdmVyW1wib25cIiArIGV2ZW50X3R5cGVzW2ldXTtcblx0XHRcdFx0aWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGxpc3RlbmVyLmNhbGwoZmlsZXNhdmVyLCBldmVudCB8fCBmaWxlc2F2ZXIpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGV4KSB7XG5cdFx0XHRcdFx0XHR0aHJvd19vdXRzaWRlKGV4KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0LCBhdXRvX2JvbSA9IGZ1bmN0aW9uKGJsb2IpIHtcblx0XHRcdC8vIHByZXBlbmQgQk9NIGZvciBVVEYtOCBYTUwgYW5kIHRleHQvKiB0eXBlcyAoaW5jbHVkaW5nIEhUTUwpXG5cdFx0XHQvLyBub3RlOiB5b3VyIGJyb3dzZXIgd2lsbCBhdXRvbWF0aWNhbGx5IGNvbnZlcnQgVVRGLTE2IFUrRkVGRiB0byBFRiBCQiBCRlxuXHRcdFx0aWYgKC9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGJsb2IudHlwZSkpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBCbG9iKFtTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkVGRiksIGJsb2JdLCB7dHlwZTogYmxvYi50eXBlfSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYmxvYjtcblx0XHR9XG5cdFx0LCBGaWxlU2F2ZXIgPSBmdW5jdGlvbihibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuXHRcdFx0aWYgKCFub19hdXRvX2JvbSkge1xuXHRcdFx0XHRibG9iID0gYXV0b19ib20oYmxvYik7XG5cdFx0XHR9XG5cdFx0XHQvLyBGaXJzdCB0cnkgYS5kb3dubG9hZCwgdGhlbiB3ZWIgZmlsZXN5c3RlbSwgdGhlbiBvYmplY3QgVVJMc1xuXHRcdFx0dmFyXG5cdFx0XHRcdCAgZmlsZXNhdmVyID0gdGhpc1xuXHRcdFx0XHQsIHR5cGUgPSBibG9iLnR5cGVcblx0XHRcdFx0LCBmb3JjZSA9IHR5cGUgPT09IGZvcmNlX3NhdmVhYmxlX3R5cGVcblx0XHRcdFx0LCBvYmplY3RfdXJsXG5cdFx0XHRcdCwgZGlzcGF0Y2hfYWxsID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0ZGlzcGF0Y2goZmlsZXNhdmVyLCBcIndyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgd3JpdGVlbmRcIi5zcGxpdChcIiBcIikpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIG9uIGFueSBmaWxlc3lzIGVycm9ycyByZXZlcnQgdG8gc2F2aW5nIHdpdGggb2JqZWN0IFVSTHNcblx0XHRcdFx0LCBmc19lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICgoaXNfY2hyb21lX2lvcyB8fCAoZm9yY2UgJiYgaXNfc2FmYXJpKSkgJiYgdmlldy5GaWxlUmVhZGVyKSB7XG5cdFx0XHRcdFx0XHQvLyBTYWZhcmkgZG9lc24ndCBhbGxvdyBkb3dubG9hZGluZyBvZiBibG9iIHVybHNcblx0XHRcdFx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRcdFx0cmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdXJsID0gaXNfY2hyb21lX2lvcyA/IHJlYWRlci5yZXN1bHQgOiByZWFkZXIucmVzdWx0LnJlcGxhY2UoL15kYXRhOlteO10qOy8sICdkYXRhOmF0dGFjaG1lbnQvZmlsZTsnKTtcblx0XHRcdFx0XHRcdFx0dmFyIHBvcHVwID0gdmlldy5vcGVuKHVybCwgJ19ibGFuaycpO1xuXHRcdFx0XHRcdFx0XHRpZighcG9wdXApIHZpZXcubG9jYXRpb24uaHJlZiA9IHVybDtcblx0XHRcdFx0XHRcdFx0dXJsPXVuZGVmaW5lZDsgLy8gcmVsZWFzZSByZWZlcmVuY2UgYmVmb3JlIGRpc3BhdGNoaW5nXG5cdFx0XHRcdFx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG5cdFx0XHRcdFx0XHRcdGRpc3BhdGNoX2FsbCgpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuXHRcdFx0XHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gZG9uJ3QgY3JlYXRlIG1vcmUgb2JqZWN0IFVSTHMgdGhhbiBuZWVkZWRcblx0XHRcdFx0XHRpZiAoIW9iamVjdF91cmwpIHtcblx0XHRcdFx0XHRcdG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoZm9yY2UpIHtcblx0XHRcdFx0XHRcdHZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZhciBvcGVuZWQgPSB2aWV3Lm9wZW4ob2JqZWN0X3VybCwgXCJfYmxhbmtcIik7XG5cdFx0XHRcdFx0XHRpZiAoIW9wZW5lZCkge1xuXHRcdFx0XHRcdFx0XHQvLyBBcHBsZSBkb2VzIG5vdCBhbGxvdyB3aW5kb3cub3Blbiwgc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9saWJyYXJ5L3NhZmFyaS9kb2N1bWVudGF0aW9uL1Rvb2xzL0NvbmNlcHR1YWwvU2FmYXJpRXh0ZW5zaW9uR3VpZGUvV29ya2luZ3dpdGhXaW5kb3dzYW5kVGFicy9Xb3JraW5nd2l0aFdpbmRvd3NhbmRUYWJzLmh0bWxcblx0XHRcdFx0XHRcdFx0dmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcblx0XHRcdFx0XHRkaXNwYXRjaF9hbGwoKTtcblx0XHRcdFx0XHRyZXZva2Uob2JqZWN0X3VybCk7XG5cdFx0XHRcdH1cblx0XHRcdDtcblx0XHRcdGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG5cblx0XHRcdGlmIChjYW5fdXNlX3NhdmVfbGluaykge1xuXHRcdFx0XHRvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRzYXZlX2xpbmsuaHJlZiA9IG9iamVjdF91cmw7XG5cdFx0XHRcdFx0c2F2ZV9saW5rLmRvd25sb2FkID0gbmFtZTtcblx0XHRcdFx0XHRjbGljayhzYXZlX2xpbmspO1xuXHRcdFx0XHRcdGRpc3BhdGNoX2FsbCgpO1xuXHRcdFx0XHRcdHJldm9rZShvYmplY3RfdXJsKTtcblx0XHRcdFx0XHRmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRmc19lcnJvcigpO1xuXHRcdH1cblx0XHQsIEZTX3Byb3RvID0gRmlsZVNhdmVyLnByb3RvdHlwZVxuXHRcdCwgc2F2ZUFzID0gZnVuY3Rpb24oYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcblx0XHRcdHJldHVybiBuZXcgRmlsZVNhdmVyKGJsb2IsIG5hbWUgfHwgYmxvYi5uYW1lIHx8IFwiZG93bmxvYWRcIiwgbm9fYXV0b19ib20pO1xuXHRcdH1cblx0O1xuXHQvLyBJRSAxMCsgKG5hdGl2ZSBzYXZlQXMpXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG5cdFx0XHRuYW1lID0gbmFtZSB8fCBibG9iLm5hbWUgfHwgXCJkb3dubG9hZFwiO1xuXG5cdFx0XHRpZiAoIW5vX2F1dG9fYm9tKSB7XG5cdFx0XHRcdGJsb2IgPSBhdXRvX2JvbShibG9iKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihibG9iLCBuYW1lKTtcblx0XHR9O1xuXHR9XG5cblx0RlNfcHJvdG8uYWJvcnQgPSBmdW5jdGlvbigpe307XG5cdEZTX3Byb3RvLnJlYWR5U3RhdGUgPSBGU19wcm90by5JTklUID0gMDtcblx0RlNfcHJvdG8uV1JJVElORyA9IDE7XG5cdEZTX3Byb3RvLkRPTkUgPSAyO1xuXG5cdEZTX3Byb3RvLmVycm9yID1cblx0RlNfcHJvdG8ub253cml0ZXN0YXJ0ID1cblx0RlNfcHJvdG8ub25wcm9ncmVzcyA9XG5cdEZTX3Byb3RvLm9ud3JpdGUgPVxuXHRGU19wcm90by5vbmFib3J0ID1cblx0RlNfcHJvdG8ub25lcnJvciA9XG5cdEZTX3Byb3RvLm9ud3JpdGVlbmQgPVxuXHRcdG51bGw7XG5cblx0cmV0dXJuIHNhdmVBcztcbn0oXG5cdCAgIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGZcblx0fHwgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3dcblx0fHwgdGhpcy5jb250ZW50XG4pKTtcbi8vIGBzZWxmYCBpcyB1bmRlZmluZWQgaW4gRmlyZWZveCBmb3IgQW5kcm9pZCBjb250ZW50IHNjcmlwdCBjb250ZXh0XG4vLyB3aGlsZSBgdGhpc2AgaXMgbnNJQ29udGVudEZyYW1lTWVzc2FnZU1hbmFnZXJcbi8vIHdpdGggYW4gYXR0cmlidXRlIGBjb250ZW50YCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSB3aW5kb3dcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMuc2F2ZUFzID0gc2F2ZUFzO1xufSBlbHNlIGlmICgodHlwZW9mIGRlZmluZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkZWZpbmUgIT09IG51bGwpICYmIChkZWZpbmUuYW1kICE9PSBudWxsKSkge1xuICBkZWZpbmUoXCJGaWxlU2F2ZXIuanNcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHNhdmVBcztcbiAgfSk7XG59XG4iLCJjb25zdCBCUE0gPSByZXF1aXJlKCdicG0nKVxuY29uc3QgRmlsZVNhdmVyID0gcmVxdWlyZSgnZmlsZS1zYXZlcicpO1xuY29uc3QgSUQzV3JpdGVyID0gcmVxdWlyZSgnYnJvd3Nlci1pZDMtd3JpdGVyJylcblxuLy8gLS0tIFBsYXlsaXN0cyAtLS1cbmxldCBzZWxlY3RTdHlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RTdHlsZScpO1xubGV0IHNwb3RpZnlMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nwb3RpZnlMaXN0Jyk7XG5sZXQgc291bmRDbG91ZExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmRDbG91ZExpc3QnKTtcbmxldCB5b3VUdWJlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5b3VUdWJlTGlzdCcpO1xuXG4vLyBTcG90aWZ5XG5sZXQgc3BvdGlmeVN0cmluZ3MgPSBbJ2h0dHBzOi8vb3Blbi5zcG90aWZ5LmNvbS9lbWJlZD91cmk9c3BvdGlmeTp1c2VyOicsICc6cGxheWxpc3Q6JywgJyZ0aGVtZT13aGl0ZSddO1xubGV0IHNwb3RpZnlVc2VyID0gJzV5dWd1Z3plOXpiNGs1OHc2amtkaXBlMTUnO1xubGV0IHNwb3RpZnlMaXN0VG9rZW5zID0ge1xuICAgIGFmcm9iZWF0OiAnM1p1T2dHVkZXbUYyYUg5cGI2dG8xUiZ0aGVtZT13aGl0ZScsXG4gICAgYmFjaGF0YTogJzVoM2FRcGE4a1V6c0dvREVFcU5GdDcnLFxuICAgIGJyYXppbGlhblpvdWs6ICc3ZzR1dk03YWI3eU5LTmo5dzdmUzkzJyxcbiAgICBraXpvbWJhOiAnMWJCYm9TTUpwMmtCeEF4NHZKNDJrYydcbn07XG5cbi8vIFNvdW5kQ2xvdWRcbmxldCBzb3VuZENsb3VkU3RyaW5ncyA9IFsnaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vcGxheWxpc3RzLycsIFxuJyZjb2xvcj0lMjNmZjU1MDAmYXV0b19wbGF5PWZhbHNlJmhpZGVfcmVsYXRlZD1mYWxzZSZzaG93X2NvbW1lbnRzPWZhbHNlJnNob3dfdXNlcj1mYWxzZSZzaG93X3JlcG9zdHM9ZmFsc2Umc2hvd190ZWFzZXI9dHJ1ZSZ2aXN1YWw9ZmFsc2UnXTtcbmxldCBzb3VuZENsb3VkTGlzdFRva2VucyA9IHtcbiAgICBhZnJvYmVhdDogJzUxMzUwNzM5MycsXG4gICAgYmFjaGF0YTogJzUxMzUwMzAzNycsXG4gICAgYnJhemlsaWFuWm91azogJzUxMzUwMTcwNScsXG4gICAga2l6b21iYTogJzUxMzUwNTAwMidcbn07XG5cbi8vWW91VHViZVxubGV0IHlvdVR1YmVTdHJpbmdzID0gW1wiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvP2xpc3RUeXBlPXBsYXlsaXN0Jmxpc3Q9XCJdO1xubGV0IHlvdVR1YmVMaXN0VG9rZW5zID0ge1xuICAgIGFmcm9iZWF0OiAnUExVX0xPM2N0MldTX1JOeVEyQjlMU28taFNPMnFPTVJaYicsXG4gICAgYmFjaGF0YTogJ1BMVV9MTzNjdDJXUzgtcndmZUkzeXJYeVRMZ1g1Vi11X08nLFxuICAgIGJyYXppbGlhblpvdWs6ICdQTFVfTE8zY3QyV1NfWkZreWMxS2IyTmVIZVVDOUJCVFA1JyxcbiAgICBraXpvbWJhOiAnUExVX0xPM2N0MldTODlKSGRNVmY4NnFzSlM2MndURlZ4Sydcbn07XG5cbnVwZGF0ZVBsYXlsaXN0cyA9IGZ1bmN0aW9uKCl7XG4gICAgc3BvdGlmeUxpc3Quc3JjID0gc3BvdGlmeVN0cmluZ3NbMF0gKyBzcG90aWZ5VXNlciArIHNwb3RpZnlTdHJpbmdzWzFdICsgc3BvdGlmeUxpc3RUb2tlbnNbc2VsZWN0U3R5bGUudmFsdWVdICsgc3BvdGlmeVN0cmluZ3NbMl07XG4gICAgc291bmRDbG91ZExpc3Quc3JjID0gc291bmRDbG91ZFN0cmluZ3NbMF0gKyBzb3VuZENsb3VkTGlzdFRva2Vuc1tzZWxlY3RTdHlsZS52YWx1ZV0gKyBzb3VuZENsb3VkU3RyaW5nc1sxXTtcbiAgICB5b3VUdWJlTGlzdC5zcmMgPSB5b3VUdWJlU3RyaW5nc1swXSArIHlvdVR1YmVMaXN0VG9rZW5zW3NlbGVjdFN0eWxlLnZhbHVlXTtcbn07XG5cbi8vIC0tLSBDb250cm9sIFNwZWN0cm8gU2Nyb2xsIC0tLVxuY29uc3Qgc2xpZGluZ1NwZWN0cm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGluZ1NwZWN0cm8uc3BlY3RybycpO1xuY29uc3QgcGxheUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5QnV0dG9uJyk7XG5jb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyJyk7XG5cbnBsYXllci5hZGRFdmVudExpc3RlbmVyKFwicGxheVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coJ25vdGljZWQgcGxheScpXG4gICAgY29uc29sZS5sb2coJCgnI3NsaWRpbmdTcGVjdHJvJykuY3NzKGFuaW1hdGlvbikpXG4gICAgc3BlY3Ryby5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncnVubmluZyc7XG59KTtcbnBsYXllci5hZGRFdmVudExpc3RlbmVyKFwicGF1c2VkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBzcGVjdHJvLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdwYXVzZWQnO1xufSk7XG5cbi8vICQoXCIjcGxheUJ1dHRvblwiKS5jbGljaygoKSA9PiB7XG4vLyAgICAgaWYoJ3BsYXknID09ICdwbGF5Jyl7XG4vLyAgICAgICAgIHNwZWN0cm8uc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlLCAncnVubmluZyc7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgc3BlY3Ryby5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUsICdwYXVzZWQnO1xuLy8gICAgIH1cbi8vIH0pO1xuXG4vLyAtLS0gQlBNIGdhdWdlIC0tLVxuLy8gTWFjaGluZSBCUE1cbiQoXCIjY2lyY3VsYXJHYXVnZUNvbnRhaW5lclwiKS5keENpcmN1bGFyR2F1Z2Uoe1xuICAgIHJhbmdlQ29udGFpbmVyOiB7IFxuICAgICAgb2Zmc2V0OiAxMCxcbiAgICAgIHJhbmdlczogW1xuICAgICAgICB7c3RhcnRWYWx1ZTogMCwgZW5kVmFsdWU6IDYwLCBjb2xvcjogJ2dyZXknfSxcbiAgICAgICAge3N0YXJ0VmFsdWU6IDYwLCBlbmRWYWx1ZTogMTQwLCBjb2xvcjogJ3doaXRlJ30sXG4gICAgICAgIHtzdGFydFZhbHVlOiAxNDAsIGVuZFZhbHVlOiAyMDAsIGNvbG9yOiAnZ3JleSd9XG4gICAgICBdXG4gICAgfSxcbiAgICBzY2FsZToge1xuICAgICAgc3RhcnRWYWx1ZTogMCwgIGVuZFZhbHVlOiAyMDAsXG4gICAgICBtYWpvclRpY2s6IHsgdGlja0ludGVydmFsOiAyMCB9LFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZm9ybWF0OiAnbnVtYmVyJyxcbiAgICAgICAgZm9udENvbG9yOiAnd2hpdGUnXG4gICAgICB9XG4gICAgfSxcbiAgICB0b29sdGlwOiB7XG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgZm9ybWF0OiAnbnVtYmVyJyxcbiAgICAgICAgICBjdXN0b21pemVUZXh0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhcmcudmFsdWVUZXh0ICsgJyBCUE0nO1xuICAgICAgICAgIH1cbiAgICAgIH0sXG4gICAgdmFsdWU6IG1hY2hpbmVCUE0sXG4gICAgYW5pbWF0aW9uOiBmYWxzZVxufSk7XG5cbi8vIEluaXRpYWwgdXNlciBCUE1cbiQoXCIjY2lyY3VsYXJHYXVnZUNvbnRhaW5lcl91c2VyXCIpLmR4Q2lyY3VsYXJHYXVnZSh7XG4gICAgcmFuZ2VDb250YWluZXI6IHsgXG4gICAgICBvZmZzZXQ6IDEwLFxuICAgICAgcmFuZ2VzOiBbXG4gICAgICAgIHtzdGFydFZhbHVlOiAwLCBlbmRWYWx1ZTogNjAsIGNvbG9yOiAnZ3JleSd9LFxuICAgICAgICB7c3RhcnRWYWx1ZTogNjAsIGVuZFZhbHVlOiAxNDAsIGNvbG9yOiAnd2hpdGUnfSxcbiAgICAgICAge3N0YXJ0VmFsdWU6IDE0MCwgZW5kVmFsdWU6IDIwMCwgY29sb3I6ICdncmV5J31cbiAgICAgIF1cbiAgICB9LFxuICAgIHNjYWxlOiB7XG4gICAgICBzdGFydFZhbHVlOiAwLCAgZW5kVmFsdWU6IDIwMCxcbiAgICAgIG1ham9yVGljazogeyB0aWNrSW50ZXJ2YWw6IDIwIH0sXG4gICAgICBsYWJlbDoge1xuICAgICAgICBmb3JtYXQ6ICdudW1iZXInLFxuICAgICAgICBmb250Q29sb3I6ICd3aGl0ZSdcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBmb3JtYXQ6ICdudW1iZXInLFxuICAgICAgICAgIGN1c3RvbWl6ZVRleHQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFyZy52YWx1ZVRleHQgKyAnIEJQTSc7XG4gICAgICAgICAgfVxuICAgICAgfSxcbiAgICB2YWx1ZTogMCxcbiAgICBhbmltYXRpb246IGZhbHNlXG59KTtcblxuLy8gcmVzZXQgQlBNIHRhcCBidXR0b25cbmNvbnN0IGJwbVJlc2V0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JwbVJlc2V0QnV0dG9uJyk7XG4kKFwiI2JwbVJlc2V0QnV0dG9uXCIpLmNsaWNrKCgpID0+IHtcbiAgICBiLnJlc2V0KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JwbVJlc2V0QnV0dG9uJykudmFsdWUgPSAwO1xuXG4gICAgJChcIiNjaXJjdWxhckdhdWdlQ29udGFpbmVyX3VzZXJcIikuZHhDaXJjdWxhckdhdWdlKHtcbiAgICAgICAgcmFuZ2VDb250YWluZXI6IHsgXG4gICAgICAgICAgb2Zmc2V0OiAxMCxcbiAgICAgICAgICByYW5nZXM6IFtcbiAgICAgICAgICAgIHtzdGFydFZhbHVlOiAwLCBlbmRWYWx1ZTogNjAsIGNvbG9yOiAnZ3JleSd9LFxuICAgICAgICAgICAge3N0YXJ0VmFsdWU6IDYwLCBlbmRWYWx1ZTogMTQwLCBjb2xvcjogJ3doaXRlJ30sXG4gICAgICAgICAgICB7c3RhcnRWYWx1ZTogMTQwLCBlbmRWYWx1ZTogMjAwLCBjb2xvcjogJ2dyZXknfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICBzdGFydFZhbHVlOiAwLCAgZW5kVmFsdWU6IDIwMCxcbiAgICAgICAgICBtYWpvclRpY2s6IHsgdGlja0ludGVydmFsOiAyMCB9LFxuICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBmb3JtYXQ6ICdudW1iZXInLFxuICAgICAgICAgICAgZm9udENvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBmb3JtYXQ6ICdudW1iZXInLFxuICAgICAgICAgICAgICBjdXN0b21pemVUZXh0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYXJnLnZhbHVlVGV4dCArICcgQlBNJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIHZhbHVlOiAwLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlXG4gICAgfSk7XG59KTtcblxuLy8gU2V0IGdhdWdlIHRvIHRhcFxuY29uc3QgYnBtQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JwbUJ1dHRvbicpO1xuY29uc3QgYiA9IG5ldyBCUE0oKTtcbiQoXCIjYnBtQnV0dG9uXCIpLmNsaWNrKCgpID0+IHtcbiAgYi50YXAoKTtcbiAgbGV0IGlucHV0QlBNdmFsdWUgPSBNYXRoLnJvdW5kKGIudGFwKCkuYXZnIC8gNCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdicG1JbnB1dCcpLnZhbHVlID0gaW5wdXRCUE12YWx1ZTtcbiAgYnBtQnV0dG9uLmlubmVySFRNTCA9IGlucHV0QlBNdmFsdWU7XG5cbiAgJChcIiNjaXJjdWxhckdhdWdlQ29udGFpbmVyX3VzZXJcIikuZHhDaXJjdWxhckdhdWdlKHtcbiAgICByYW5nZUNvbnRhaW5lcjogeyBcbiAgICAgIG9mZnNldDogMTAsXG4gICAgICByYW5nZXM6IFtcbiAgICAgICAge3N0YXJ0VmFsdWU6IDAsIGVuZFZhbHVlOiA2MCwgY29sb3I6ICdncmV5J30sXG4gICAgICAgIHtzdGFydFZhbHVlOiA2MCwgZW5kVmFsdWU6IDE0MCwgY29sb3I6ICd3aGl0ZSd9LFxuICAgICAgICB7c3RhcnRWYWx1ZTogMTQwLCBlbmRWYWx1ZTogMjAwLCBjb2xvcjogJ2dyZXknfVxuICAgICAgXVxuICAgIH0sXG4gICAgc2NhbGU6IHtcbiAgICAgIHN0YXJ0VmFsdWU6IDAsICBlbmRWYWx1ZTogMjAwLFxuICAgICAgbWFqb3JUaWNrOiB7IHRpY2tJbnRlcnZhbDogMjAgfSxcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGZvcm1hdDogJ251bWJlcicsXG4gICAgICAgIGZvbnRDb2xvcjogJ3doaXRlJ1xuICAgICAgfVxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGZvcm1hdDogJ251bWJlcicsXG4gICAgICAgICAgY3VzdG9taXplVGV4dDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICByZXR1cm4gYXJnLnZhbHVlVGV4dCArICcgQlBNJztcbiAgICAgICAgICB9XG4gICAgICB9LFxuICAgIHZhbHVlOiBpbnB1dEJQTXZhbHVlLFxuICAgIGFuaW1hdGlvbjogZmFsc2Vcbn0pO1xufSk7XG5cbi8vIC0tLSBDTk4gQmFyIENoYXJ0IC0tLVxudmFyIGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDaGFydFwiKS5nZXRDb250ZXh0KCcyZCcpO1xudmFyIG15Q2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG4gICAgdHlwZTogJ2hvcml6b250YWxCYXInLFxuICAgIHBvc2l0aW9uOiBcInJpZ2h0XCIsXG4gICAgZGF0YToge1xuICAgICAgICAvKmxhYmVsczogW1wiQUZST0JFQVRcIiwgXCJCQUNIQVRBXCIsIFwiQlJBWklMSUFOIFpPVUtcIiwgXCJLSVpPTUJBXCJdLCovXG4gICAgICAgIGxhYmVsczogW1wiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiXSxcbiAgICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgICAgICBsYWJlbDogJ1Njb3JlJyxcbiAgICAgICAgICAgIGRhdGE6IGNubkFycmF5LFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnXG4gICAgICAgIH1dXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIGxlZ2VuZDoge1xuICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICByZXNwb25zaXZlOiBmYWxzZSxcbiAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgICByZXZlcnNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmb250Q29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLy8gLS0tIFVzZXIgRmVlZGJhY2sgLS0tXG4vLyBjb25zdCBzdWJtaXRGZWVkYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRGZWVkYmFjaycpO1xuLy8gY29uc3QgaW5wdXRNUDMgPSAnLi9DTk4vSW5wdXQvUmF3L25ldy5tcDMnO1xuLy8gY29uc3Qgb3V0cHV0TVAzcGF0aCA9ICcuL0NOTi9JbnB1dC9Db3JyZWN0ZWQvJztcblxuLy8gY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUnKTtcbi8vIGNvbnN0IGFydGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcnRpc3QnKTtcbi8vIGNvbnN0IGFsYnVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsYnVtJyk7XG4vLyBjb25zdCB5ZWFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3llYXInKTtcblxuLy8gJChcIiNzdWJtaXRGZWVkYmFja1wiKS5jbGljaygoKSA9PiB7XG5cbi8vICAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgbWV0YSBkYXRhJylcbi8vICAgICAvLyBCcm93c2VyXG5cbi8vICAgICAvLyAvLyByZWFkIGFycmF5IGJ1ZmZlclxuLy8gICAgIC8vIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4vLyAgICAgLy8gcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAvLyAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSByZWFkZXIucmVzdWx0O1xuLy8gICAgIC8vICAgICAvLyBnbyBuZXh0XG4vLyAgICAgLy8gfTtcbi8vICAgICAvLyByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAvLyAgICAgLy8gaGFuZGxlIGVycm9yXG4vLyAgICAgLy8gICAgIGNvbnNvbGUuZXJyb3IoJ1JlYWRlciBlcnJvcicsIHJlYWRlci5lcnJvcik7XG4vLyAgICAgLy8gfTtcbi8vICAgICAvLyByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoaW5wdXRNUDMpO1xuXG4vLyAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4vLyAgICAgeGhyLm9wZW4oJ0dFVCcsIGlucHV0TVAzLCB0cnVlKTtcbi8vICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbi8vICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4vLyAgICAgICAgICAgICBsZXQgYXJyYXlCdWZmZXIgPSB4aHIucmVzcG9uc2U7XG4vLyAgICAgICAgICAgICAvLyBnbyBuZXh0XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAvLyBoYW5kbGUgZXJyb3Jcbi8vICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoeGhyLnN0YXR1c1RleHQgKyAnICgnICsgeGhyLnN0YXR1cyArICcpJyk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9O1xuLy8gICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgIC8vIGhhbmRsZSBlcnJvclxuLy8gICAgICAgICBjb25zb2xlLmVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4vLyAgICAgfTtcbi8vICAgICB4aHIuc2VuZCgpO1xuXG4vLyAgICAgLy8gd3JpdGUgbmV3IHRhZ3Ncbi8vICAgICBjb25zdCB3cml0ZXIgPSBuZXcgSUQzV3JpdGVyKGFycmF5QnVmZmVyKTtcbi8vICAgICB3cml0ZXIuc2V0RnJhbWUoJ1RJVDInLCB0aXRsZSlcbi8vICAgICAgICAgLnNldEZyYW1lKCdUUEUxJywgYXJ0aXN0KVxuLy8gICAgICAgICAuc2V0RnJhbWUoJ1RBTEInLCBhbGJ1bSlcbi8vICAgICAgICAgLnNldEZyYW1lKCdUWUVSJywgeWVhcilcbi8vICAgICAgICAgLnNldEZyYW1lKCdUQlBNJywgYi50YXAoKS5hdmcgLyAyKTtcbi8vICAgICB3cml0ZXIuYWRkVGFnKCk7XG5cbi8vICAgICBjb25zdCB0YWdnZWRTb25nQnVmZmVyID0gd3JpdGVyLmFycmF5QnVmZmVyO1xuLy8gICAgIGNvbnN0IGJsb2IgPSB3cml0ZXIuZ2V0QmxvYigpO1xuLy8gICAgIGNvbnN0IHVybCA9IHdyaXRlci5nZXRVUkwoKTtcbi8vICAgICBGaWxlU2F2ZXIuc2F2ZUFzKGJsb2IsIG91dHB1dE1QM3BhdGggKyB0aXRsZSArICcubXAzJyk7XG5cbi8vICAgICBtcDNkb3dubG9hZCA9IGdldEVsZW1lbnRCeUlkKCdtcDNkb3dubG9hZCcpO1xuLy8gICAgIG1wM2Rvd25sb2FkLmhyZWYgPSAnQ05OL0lucHV0L0NvcnJlY3RlZC8nICsgdGl0bGUgKyAnbXAzJztcblxuICAgIC8vIE5vZGVcbiAgICAvLyBjb25zdCBzb25nQnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKGlucHV0TVAzKTtcbiAgICAvLyBjb25zdCB3cml0ZXIgPSBuZXcgSUQzV3JpdGVyKHNvbmdCdWZmZXIpO1xuXG4gICAgLy8gd3JpdGVyLnNldEZyYW1lKCdUSVQyJywgdGl0bGUpXG4gICAgLy8gICAgIC5zZXRGcmFtZSgnVFBFMScsIGFydGlzdClcbiAgICAvLyAgICAgLnNldEZyYW1lKCdUQUxCJywgYWxidW0pXG4gICAgLy8gICAgIC5zZXRGcmFtZSgnVFlFUicsIHllYXIpXG4gICAgLy8gICAgIC5zZXRGcmFtZSgnVEJQTScsIGIudGFwKCkuYXZnIC8gMik7XG4gICAgLy8gd3JpdGVyLmFkZFRhZygpO1xuXG4gICAgLy8gY29uc3QgdGFnZ2VkU29uZ0J1ZmZlciA9IEJ1ZmZlci5mcm9tKHdyaXRlci5hcnJheUJ1ZmZlcik7XG4gICAgLy8gZnMud3JpdGVGaWxlU3luYyhvdXRwdXRNUDNwYXRoICsgdGl0bGUgKyAnLm1wMycsIHRhZ2dlZFNvbmdCdWZmZXIpO1xuLy8gfSk7Il19
