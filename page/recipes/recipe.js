const ctx = document.getElementById('myPieChart').getContext('2d');
    const data = {
      labels: ['Fat', 'Carbohydrate', 'Protein'],
      datasets: [{
        data: [38.3, 48.9, 12.8],
        backgroundColor: ['#DB4965', '#F4A261', '#2A9D8F'],
        borderColor: '#fff',
        borderWidth: 2
      }]
    };

    const config = {
      type: 'pie',
      data: data,
      options: {
        responsive: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    };

    new Chart(ctx, config);
