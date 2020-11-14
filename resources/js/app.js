function init() {

    d3.json("resources/data/enrollment_comparsion_data.json").then((enrollData) => {
      var data = enrollData;
      console.log(data);

      var keptCoverage = data.filter(cov => cov['TYPE OF ENROLLMENT CHANGE'] = 'Kept Coverage');
      var addedCoverage = data.filter(cov => cov['TYPE OF ENROLLMENT CHANGE'] = 'Added Coverage');

      var trace1 = {
        type: 'bar',
        x: keptCoverage.map(row => row['PLAN TYPE']),
        y: keptCoverage.map(row => row['# of Employees']),
        text: keptCoverage.map(row => row['# of Employees']),
        marker: {
          color: 'rgb(157,157,157)'
        },
        name: 'Kept Coverage',
      };

      var trace2 = {
        type: 'bar',
        x: addedCoverage.map(row => row['PLAN TYPE']),
        y: addedCoverage.map(row => row['# of Employees']),
        text: addedCoverage.map(row => row['# of Employees']),
        marker: {
          color: 'rgb(157,157,157)'
        },
        name: 'Added Coverage',
      };

      var data = [trace1, trace2];

      var layout = {
        title: 'Portofino\'s Monthly Online Sales',
        barmode: 'group',
        font: {
          family: 'Bahnschrift',
          size: 24,
          color: 'white'
        },
        height: 450,
        margin: {
          t: 75
        },
        paper_bgcolor: 'rgb(191, 205, 223)',
        plot_bgcolor: 'rgb(230, 235, 242)',
        xaxis: { title: 'Monthly' },
        yaxis: { title: 'Net Totals' },
      };
  
      var config = { responsive: true }
  
      Plotly.newPlot('monthly', data, layout, config);

    });

}

// Initialize the dashboard
init();