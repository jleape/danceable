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