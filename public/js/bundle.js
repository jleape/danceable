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

// machine BPM
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
              return 'Current ' + arg.valueText;
          }
      },
    value: 0,
    animation: false
});

// reset BPM tap button
const bpmResetButton = document.getElementById('bpmResetButton');
$("#bpmResetButton").click(() => {
    b.reset();

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
        value: 0,
        animation: false
    });
});

// Set gauge to tap
const bpmButton = document.getElementById('bpmButton');
const b = new BPM();
$("#bpmButton").click(() => {
  b.tap();
  
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
    value: b.tap().avg / 2,
    animation: false
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm5vZGVfbW9kdWxlcy9icG0vYnBtLmpzIiwicHVibGljL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcbiAqIENhbGN1bGF0ZSBCUE1cbiAqL1xuXG5pZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gQlBNO1xuICBtb2R1bGUuZXhwb3J0cy5CUE0gPSBCUE07XG59XG5cbmZ1bmN0aW9uIEJQTSgpIHtcbiAgdGhpcy5jb3VudCA9IDA7XG4gIHRoaXMudHMgPSAwO1xuICB0aGlzLm9sZF90cyA9IDA7XG59XG5cbkJQTS5wcm90b3R5cGUudGFwID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudHMgPSBEYXRlLm5vdygpO1xuICBpZiAoIXRoaXMuZmlyc3RfdHMpIHRoaXMuZmlyc3RfdHMgPSB0aGlzLnRzO1xuXG4gIHZhciByZXQgPSB7fTtcblxuICAvLyBpZ25vcmUgdGhlIGZpcnN0IHRhcFxuICBpZiAodGhpcy5vbGRfdHMpIHtcbiAgICB2YXIgbXMgPSB0aGlzLnRzIC0gdGhpcy5vbGRfdHM7XG5cbiAgICB2YXIgYXZnID0gNjAwMDAgKiB0aGlzLmNvdW50IC8gKHRoaXMudHMgLSB0aGlzLmZpcnN0X3RzKTtcblxuICAgIHJldC5hdmcgPSBhdmc7XG4gICAgcmV0Lm1zID0gbXM7XG4gIH1cblxuICByZXQuY291bnQgPSArK3RoaXMuY291bnQ7XG5cbiAgLy8gU3RvcmUgdGhlIG9sZCB0aW1lc3RhbXBcbiAgdGhpcy5vbGRfdHMgPSB0aGlzLnRzO1xuICByZXR1cm4gcmV0O1xufTtcblxuQlBNLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNvdW50ID0gMDtcbiAgdGhpcy50cyA9IDA7XG4gIHRoaXMub2xkX3RzID0gMDtcbiAgdGhpcy5maXJzdF90cyA9IDA7XG59O1xuIiwiY29uc3QgQlBNID0gcmVxdWlyZSgnYnBtJylcblxuLy8gQ2lyY3VsYXIgQlBNIGdhdWdlXG5cbi8vIG1hY2hpbmUgQlBNXG4kKFwiI2NpcmN1bGFyR2F1Z2VDb250YWluZXJcIikuZHhDaXJjdWxhckdhdWdlKHtcbiAgICByYW5nZUNvbnRhaW5lcjogeyBcbiAgICAgIG9mZnNldDogMTAsXG4gICAgICByYW5nZXM6IFtcbiAgICAgICAge3N0YXJ0VmFsdWU6IDAsIGVuZFZhbHVlOiA2MCwgY29sb3I6ICdncmV5J30sXG4gICAgICAgIHtzdGFydFZhbHVlOiA2MCwgZW5kVmFsdWU6IDE0MCwgY29sb3I6ICd3aGl0ZSd9LFxuICAgICAgICB7c3RhcnRWYWx1ZTogMTQwLCBlbmRWYWx1ZTogMjAwLCBjb2xvcjogJ2dyZXknfVxuICAgICAgXVxuICAgIH0sXG4gICAgc2NhbGU6IHtcbiAgICAgIHN0YXJ0VmFsdWU6IDAsICBlbmRWYWx1ZTogMjAwLFxuICAgICAgbWFqb3JUaWNrOiB7IHRpY2tJbnRlcnZhbDogMjAgfSxcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGZvcm1hdDogJ251bWJlcicsXG4gICAgICAgIGZvbnRDb2xvcjogJ3doaXRlJ1xuICAgICAgfVxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGZvcm1hdDogJ251bWJlcicsXG4gICAgICAgICAgY3VzdG9taXplVGV4dDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICByZXR1cm4gJ0N1cnJlbnQgJyArIGFyZy52YWx1ZVRleHQ7XG4gICAgICAgICAgfVxuICAgICAgfSxcbiAgICB2YWx1ZTogbWFjaGluZUJQTSxcbiAgICBhbmltYXRpb246IGZhbHNlXG59KTtcblxuLy8gSW5pdGlhbCB1c2VyIEJQTVxuJChcIiNjaXJjdWxhckdhdWdlQ29udGFpbmVyX3VzZXJcIikuZHhDaXJjdWxhckdhdWdlKHtcbiAgICByYW5nZUNvbnRhaW5lcjogeyBcbiAgICAgIG9mZnNldDogMTAsXG4gICAgICByYW5nZXM6IFtcbiAgICAgICAge3N0YXJ0VmFsdWU6IDAsIGVuZFZhbHVlOiA2MCwgY29sb3I6ICdncmV5J30sXG4gICAgICAgIHtzdGFydFZhbHVlOiA2MCwgZW5kVmFsdWU6IDE0MCwgY29sb3I6ICd3aGl0ZSd9LFxuICAgICAgICB7c3RhcnRWYWx1ZTogMTQwLCBlbmRWYWx1ZTogMjAwLCBjb2xvcjogJ2dyZXknfVxuICAgICAgXVxuICAgIH0sXG4gICAgc2NhbGU6IHtcbiAgICAgIHN0YXJ0VmFsdWU6IDAsICBlbmRWYWx1ZTogMjAwLFxuICAgICAgbWFqb3JUaWNrOiB7IHRpY2tJbnRlcnZhbDogMjAgfSxcbiAgICAgIGxhYmVsOiB7XG4gICAgICAgIGZvcm1hdDogJ251bWJlcicsXG4gICAgICAgIGZvbnRDb2xvcjogJ3doaXRlJ1xuICAgICAgfVxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGZvcm1hdDogJ251bWJlcicsXG4gICAgICAgICAgY3VzdG9taXplVGV4dDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICByZXR1cm4gJ0N1cnJlbnQgJyArIGFyZy52YWx1ZVRleHQ7XG4gICAgICAgICAgfVxuICAgICAgfSxcbiAgICB2YWx1ZTogMCxcbiAgICBhbmltYXRpb246IGZhbHNlXG59KTtcblxuLy8gcmVzZXQgQlBNIHRhcCBidXR0b25cbmNvbnN0IGJwbVJlc2V0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JwbVJlc2V0QnV0dG9uJyk7XG4kKFwiI2JwbVJlc2V0QnV0dG9uXCIpLmNsaWNrKCgpID0+IHtcbiAgICBiLnJlc2V0KCk7XG5cbiAgICAkKFwiI2NpcmN1bGFyR2F1Z2VDb250YWluZXJfdXNlclwiKS5keENpcmN1bGFyR2F1Z2Uoe1xuICAgICAgICByYW5nZUNvbnRhaW5lcjogeyBcbiAgICAgICAgICBvZmZzZXQ6IDEwLFxuICAgICAgICAgIHJhbmdlczogW1xuICAgICAgICAgICAge3N0YXJ0VmFsdWU6IDAsIGVuZFZhbHVlOiA2MCwgY29sb3I6ICdncmV5J30sXG4gICAgICAgICAgICB7c3RhcnRWYWx1ZTogNjAsIGVuZFZhbHVlOiAxNDAsIGNvbG9yOiAnd2hpdGUnfSxcbiAgICAgICAgICAgIHtzdGFydFZhbHVlOiAxNDAsIGVuZFZhbHVlOiAyMDAsIGNvbG9yOiAnZ3JleSd9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBzY2FsZToge1xuICAgICAgICAgIHN0YXJ0VmFsdWU6IDAsICBlbmRWYWx1ZTogMjAwLFxuICAgICAgICAgIG1ham9yVGljazogeyB0aWNrSW50ZXJ2YWw6IDIwIH0sXG4gICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIGZvcm1hdDogJ251bWJlcicsXG4gICAgICAgICAgICBmb250Q29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGZvcm1hdDogJ251bWJlcicsXG4gICAgICAgICAgICAgIGN1c3RvbWl6ZVRleHQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAnQ3VycmVudCAnICsgYXJnLnZhbHVlVGV4dDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIHZhbHVlOiAwLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlXG4gICAgfSk7XG59KTtcblxuLy8gU2V0IGdhdWdlIHRvIHRhcFxuY29uc3QgYnBtQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JwbUJ1dHRvbicpO1xuY29uc3QgYiA9IG5ldyBCUE0oKTtcbiQoXCIjYnBtQnV0dG9uXCIpLmNsaWNrKCgpID0+IHtcbiAgYi50YXAoKTtcbiAgXG4gICQoXCIjY2lyY3VsYXJHYXVnZUNvbnRhaW5lcl91c2VyXCIpLmR4Q2lyY3VsYXJHYXVnZSh7XG4gICAgcmFuZ2VDb250YWluZXI6IHsgXG4gICAgICBvZmZzZXQ6IDEwLFxuICAgICAgcmFuZ2VzOiBbXG4gICAgICAgIHtzdGFydFZhbHVlOiAwLCBlbmRWYWx1ZTogNjAsIGNvbG9yOiAnZ3JleSd9LFxuICAgICAgICB7c3RhcnRWYWx1ZTogNjAsIGVuZFZhbHVlOiAxNDAsIGNvbG9yOiAnd2hpdGUnfSxcbiAgICAgICAge3N0YXJ0VmFsdWU6IDE0MCwgZW5kVmFsdWU6IDIwMCwgY29sb3I6ICdncmV5J31cbiAgICAgIF1cbiAgICB9LFxuICAgIHNjYWxlOiB7XG4gICAgICBzdGFydFZhbHVlOiAwLCAgZW5kVmFsdWU6IDIwMCxcbiAgICAgIG1ham9yVGljazogeyB0aWNrSW50ZXJ2YWw6IDIwIH0sXG4gICAgICBsYWJlbDoge1xuICAgICAgICBmb3JtYXQ6ICdudW1iZXInLFxuICAgICAgICBmb250Q29sb3I6ICd3aGl0ZSdcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBmb3JtYXQ6ICdudW1iZXInLFxuICAgICAgICAgIGN1c3RvbWl6ZVRleHQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdDdXJyZW50ICcgKyBhcmcudmFsdWVUZXh0O1xuICAgICAgICAgIH1cbiAgICAgIH0sXG4gICAgdmFsdWU6IGIudGFwKCkuYXZnIC8gMixcbiAgICBhbmltYXRpb246IGZhbHNlXG59KTtcbn0pO1xuXG5cblxuLy8gSG9yaXpvbnRhbCBiYXIgY2hhcnQgd2l0aCBDTk4gcmVzdWx0c1xuXG52YXIgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNoYXJ0XCIpLmdldENvbnRleHQoJzJkJyk7XG52YXIgbXlDaGFydCA9IG5ldyBDaGFydChjdHgsIHtcbiAgICB0eXBlOiAnaG9yaXpvbnRhbEJhcicsXG4gICAgcG9zaXRpb246IFwicmlnaHRcIixcbiAgICBkYXRhOiB7XG4gICAgICAgIC8qbGFiZWxzOiBbXCJBRlJPQkVBVFwiLCBcIkJBQ0hBVEFcIiwgXCJCUkFaSUxJQU4gWk9VS1wiLCBcIktJWk9NQkFcIl0sKi9cbiAgICAgICAgbGFiZWxzOiBbXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCJdLFxuICAgICAgICBkYXRhc2V0czogW3tcbiAgICAgICAgICAgIGxhYmVsOiAnU2NvcmUnLFxuICAgICAgICAgICAgZGF0YTogY25uQXJyYXksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZSdcbiAgICAgICAgfV1cbiAgICB9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgIGRpc3BsYXk6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNpdmU6IGZhbHNlLFxuICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgIHhBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIHJldmVyc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTIsXG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cbn0pOyJdfQ==
