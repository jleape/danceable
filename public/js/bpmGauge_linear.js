// Linear gauge showing calculated and input BPM

var randomScalingFactor = function(k) {
    return Math.round(Math.random() * k)
};

var barChartData10 = {labels: [], datasets: []};
barChartData10.datasets.push({
    data: [60],
    pointer: 'point',
    shape: 'triangle',
    width: 18,
    height: 25,
    offset: 12,
    backgroundColor: 'white'
});

barChartData10.datasets.push({
    data: [120],
    pointer: 'point',
    shape: 'inverted-triangle',
    width: 18,
    height: 25,
    offset: -46,
    backgroundColor: 'white'
});

window.onload = function() {
    var ctx10 = document.getElementById("canvas10").getContext("2d");
    window.bpmGauge = new Chart(ctx10, {
        type: 'linearGauge',
        data: barChartData10,
        options: {
            responsive: true,
            scale: {
                horizontal: false,
                range: {
                    startValue: 0,
                    endValue: 200
                },
                responsive: true,
                font: {
                    fontName: 'Arial',
                    fontSize: 8
                },
                axisWidth: 30,
                axisColor: 'white',
                scaleLabel: {
                    display: true,
                    interval: 20,
                    units: '',
                    offset: -17,
                    color: 'white'
                }
            },
            legend: {
                display: false,
                position: ''
            }
        }
        
    });
        
    setInterval(function() {
        barChartData10.datasets[0].data = [randomScalingFactor(150) + 30];
        window.bpmGauge.update();
    }, 3000);
};