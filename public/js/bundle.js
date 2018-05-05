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
const BPM = require('bpm')

// Circular BPM gauge
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
              return 'Current ' + arg.valueText;
          }
      },
    value: machineBPM
});

const bpmButton = document.getElementById('bpmButton');
//const display = document.getElementById('display');

const b = new BPM();
$("#bpmButton").click(() => {
  b.tap();
  //console.log(b.tap().avg);

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
              return 'Current ' + arg.valueText;
          }
      },
    value: b.tap().avg
});
});



// Horizontal bar chart with CNN results

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
},{"bpm":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm5vZGVfbW9kdWxlcy9icG0vYnBtLmpzIiwicHVibGljL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxuICogQ2FsY3VsYXRlIEJQTVxuICovXG5cbmlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBCUE07XG4gIG1vZHVsZS5leHBvcnRzLkJQTSA9IEJQTTtcbn1cblxuZnVuY3Rpb24gQlBNKCkge1xuICB0aGlzLmNvdW50ID0gMDtcbiAgdGhpcy50cyA9IDA7XG4gIHRoaXMub2xkX3RzID0gMDtcbn1cblxuQlBNLnByb3RvdHlwZS50YXAgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy50cyA9IERhdGUubm93KCk7XG4gIGlmICghdGhpcy5maXJzdF90cykgdGhpcy5maXJzdF90cyA9IHRoaXMudHM7XG5cbiAgdmFyIHJldCA9IHt9O1xuXG4gIC8vIGlnbm9yZSB0aGUgZmlyc3QgdGFwXG4gIGlmICh0aGlzLm9sZF90cykge1xuICAgIHZhciBtcyA9IHRoaXMudHMgLSB0aGlzLm9sZF90cztcblxuICAgIHZhciBhdmcgPSA2MDAwMCAqIHRoaXMuY291bnQgLyAodGhpcy50cyAtIHRoaXMuZmlyc3RfdHMpO1xuXG4gICAgcmV0LmF2ZyA9IGF2ZztcbiAgICByZXQubXMgPSBtcztcbiAgfVxuXG4gIHJldC5jb3VudCA9ICsrdGhpcy5jb3VudDtcblxuICAvLyBTdG9yZSB0aGUgb2xkIHRpbWVzdGFtcFxuICB0aGlzLm9sZF90cyA9IHRoaXMudHM7XG4gIHJldHVybiByZXQ7XG59O1xuXG5CUE0ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY291bnQgPSAwO1xuICB0aGlzLnRzID0gMDtcbiAgdGhpcy5vbGRfdHMgPSAwO1xuICB0aGlzLmZpcnN0X3RzID0gMDtcbn07XG4iLCJjb25zdCBCUE0gPSByZXF1aXJlKCdicG0nKVxuXG4vLyBDaXJjdWxhciBCUE0gZ2F1Z2VcbiQoXCIjY2lyY3VsYXJHYXVnZUNvbnRhaW5lclwiKS5keENpcmN1bGFyR2F1Z2Uoe1xuICAgIHJhbmdlQ29udGFpbmVyOiB7IFxuICAgICAgb2Zmc2V0OiAxMCxcbiAgICAgIHJhbmdlczogW1xuICAgICAgICB7c3RhcnRWYWx1ZTogMCwgZW5kVmFsdWU6IDYwLCBjb2xvcjogJ2dyZXknfSxcbiAgICAgICAge3N0YXJ0VmFsdWU6IDYwLCBlbmRWYWx1ZTogMTQwLCBjb2xvcjogJ3doaXRlJ30sXG4gICAgICAgIHtzdGFydFZhbHVlOiAxNDAsIGVuZFZhbHVlOiAyMDAsIGNvbG9yOiAnZ3JleSd9XG4gICAgICBdXG4gICAgfSxcbiAgICBzY2FsZToge1xuICAgICAgc3RhcnRWYWx1ZTogMCwgIGVuZFZhbHVlOiAyMDAsXG4gICAgICBtYWpvclRpY2s6IHsgdGlja0ludGVydmFsOiAyMCB9LFxuICAgICAgbGFiZWw6IHtcbiAgICAgICAgZm9ybWF0OiAnbnVtYmVyJyxcbiAgICAgICAgZm9udENvbG9yOiAnd2hpdGUnXG4gICAgICB9XG4gICAgfSxcbiAgICB0b29sdGlwOiB7XG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgZm9ybWF0OiAnbnVtYmVyJyxcbiAgICAgICAgICBjdXN0b21pemVUZXh0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnQ3VycmVudCAnICsgYXJnLnZhbHVlVGV4dDtcbiAgICAgICAgICB9XG4gICAgICB9LFxuICAgIHZhbHVlOiBtYWNoaW5lQlBNXG59KTtcblxuY29uc3QgYnBtQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JwbUJ1dHRvbicpO1xuLy9jb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXknKTtcblxuY29uc3QgYiA9IG5ldyBCUE0oKTtcbiQoXCIjYnBtQnV0dG9uXCIpLmNsaWNrKCgpID0+IHtcbiAgYi50YXAoKTtcbiAgLy9jb25zb2xlLmxvZyhiLnRhcCgpLmF2Zyk7XG5cbiAgJChcIiNjaXJjdWxhckdhdWdlQ29udGFpbmVyX3VzZXJcIikuZHhDaXJjdWxhckdhdWdlKHtcbiAgICByYW5nZUNvbnRhaW5lcjogeyBcbiAgICAgIG9mZnNldDogMTAsXG4gICAgICByYW5nZXM6IFtcbiAgICAgICAge3N0YXJ0VmFsdWU6IDAsIGVuZFZhbHVlOiA2MCwgY29sb3I6ICdncmV5J30sXG4gICAgICAgIHtzdGFydFZhbHVlOiA2MCwgZW5kVmFsdWU6IDE0MCwgY29sb3I6ICd3aGl0ZSd9LFxuICAgICAgICB7c3RhcnRWYWx1ZTogMTQwLCBlbmRWYWx1ZTogMjAwLCBjb2xvcjogJ2dyZXknfVxuICAgICAgXVxuICAgIH0sXG4gICAgc2NhbGU6IHtcbiAgICAgIHN0YXJ0VmFsdWU6IDAsICBlbmRWYWx1ZTogMjAwLFxuICAgICAgbWFqb3JUaWNrOiB7IHRpY2tJbnRlcnZhbDogMjAgfSxcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGZvcm1hdDogJ251bWJlcicsXG4gICAgICAgIGZvbnRDb2xvcjogJ3doaXRlJ1xuICAgICAgfVxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGZvcm1hdDogJ251bWJlcicsXG4gICAgICAgICAgY3VzdG9taXplVGV4dDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICByZXR1cm4gJ0N1cnJlbnQgJyArIGFyZy52YWx1ZVRleHQ7XG4gICAgICAgICAgfVxuICAgICAgfSxcbiAgICB2YWx1ZTogYi50YXAoKS5hdmdcbn0pO1xufSk7XG5cblxuXG4vLyBIb3Jpem9udGFsIGJhciBjaGFydCB3aXRoIENOTiByZXN1bHRzXG5cbnZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2hhcnRcIikuZ2V0Q29udGV4dCgnMmQnKTtcbnZhciBteUNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xuICAgIHR5cGU6ICdob3Jpem9udGFsQmFyJyxcbiAgICBwb3NpdGlvbjogXCJyaWdodFwiLFxuICAgIGRhdGE6IHtcbiAgICAgICAgLypsYWJlbHM6IFtcIkFGUk9CRUFUXCIsIFwiQkFDSEFUQVwiLCBcIkJSQVpJTElBTiBaT1VLXCIsIFwiS0laT01CQVwiXSwqL1xuICAgICAgICBsYWJlbHM6IFtcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIl0sXG4gICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgbGFiZWw6ICdTY29yZScsXG4gICAgICAgICAgICBkYXRhOiBjbm5BcnJheSxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJ1xuICAgICAgICB9XVxuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2l2ZTogZmFsc2UsXG4gICAgICAgIHNjYWxlczoge1xuICAgICAgICAgICAgeEF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZm9udENvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgICAgICAgICAgICAgYmVnaW5BdFplcm86IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfVxufSk7Il19
