function init() {

  d3.json("resources/data/enrollment_comparsion_data.json").then((enrollData) => {
    // console.log(enrollData);

    var data = enrollData;
    // console.log(data);

    var kept = data.filter(coverage => coverage['TYPE OF ENROLLMENT CHANGE'] == 'Kept Coverage');
    var added = data.filter(coverage => coverage['TYPE OF ENROLLMENT CHANGE'] == 'Added Coverage');
    console.log(kept);
    console.log(added);


    // (https://stackoverflow.com/questions/29364262/how-to-group-by-and-sum-array-of-object)
    var sumKept = [];
    kept.reduce(function (kpt, value) {
      if (!kpt[value['PLAN TYPE']]) {
        kpt[value['PLAN TYPE']] = { 'PLAN TYPE': value['PLAN TYPE'], '# of Employees': 0 };
        sumKept.push(kpt[value['PLAN TYPE']])
      }
      kpt[value['PLAN TYPE']]['# of Employees'] += value['# of Employees'];
      return kpt;
    }, {});

    var sumAdded = [];
    added.reduce(function (add, value) {
      if (!add[value['PLAN TYPE']]) {
        add[value['PLAN TYPE']] = { 'PLAN TYPE': value['PLAN TYPE'], '# of Employees': 0 };
        sumAdded.push(add[value['PLAN TYPE']])
      }
      add[value['PLAN TYPE']]['# of Employees'] += value['# of Employees'];
      return add;
    }, {});

    console.log(sumKept);
    console.log(sumAdded);


    var sortedKept = sumKept.sort(function (a, b) {
      return b['# of Employees'] - a['# of Employees']
    });

    console.log(sortedKept);


    var trace1 = {
      type: 'bar',
      x: sumKept.map(row => row['PLAN TYPE']),
      y: sumKept.map(row => row['# of Employees']),
      text: "Kept Coverage",
      text: sumKept.map(row => row['# of Employees']),
      textposition: 'auto',
      name: 'Kept Coverage',
    };

    var trace2 = {
      type: 'bar',
      x: sumAdded.map(row => row['PLAN TYPE']),
      y: sumAdded.map(row => row['# of Employees']),
      text: sumAdded.map(row => row['# of Employees']),
      textposition: 'auto',
      name: 'Added Coverage',
    };

    var data = [trace1, trace2];

    var layout = {
      title: 'Employee Benefit Enrollment',
      barmode: 'group',
      xaxis: { title: 'Plan Name' },
      yaxis: { title: '# of Employees' },
    };

    var config = { responsive: true }

    Plotly.newPlot('enrollment', data, layout, config);

  });

}

// Initialize the dashboard
init();