var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7'],
        datasets: [{
            label: 'focus_time',
            backgroundColor: [
							'white',
							'white',
							'white',
							'white',
							'white',
							'white',
							'#FF4384'
            ],
						data: [16, 12, 16, 8, 12, 4, 20]
        }]
    },

    // Configuration options go here
    options: {
			scales: {
				xAxes: [{
					line: {
						color: 'white'
					},
					gridLines: {
						display: false
					},
					ticks: {
						fontColor: 'white'
					}
				}],
				yAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						fontColor: 'white',
						min: 0,
						max: 24,
						stepSize: 4
					}
				}]
			}
		}
});
