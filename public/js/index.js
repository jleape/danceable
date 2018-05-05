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