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