function enrollmentBarCharts(sample) {

  d3.json("resources/data/enrollment_comparsion_data.json").then((enrollData) => {
    // console.log(enrollData);

    var data = enrollData;
    // console.log(data);

    var kept = data.filter(coverage => coverage['TYPE OF ENROLLMENT CHANGE'] == 'Kept Coverage'); // Used for Bar Charts
    var added = data.filter(coverage => coverage['TYPE OF ENROLLMENT CHANGE'] == 'Added Coverage'); // Used for Bar Charts
    // console.log(kept);
    // console.log(added);

    // (https://stackoverflow.com/questions/29364262/how-to-group-by-and-sum-array-of-object)
    var sumKept = [];
    // (https://www.w3schools.com/jsref/jsref_reduce.asp)
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

    // console.log(sumKept);
    // console.log(sumAdded);

    var sortedKept = sumKept.sort(function (a, b) {
      return b['# of Employees'] - a['# of Employees']
    });

    // console.log(sortedKept);


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

function enrollmentTable(sample) {

  d3.json("resources/data/enrollment_comparsion_data.json").then((enrollData) => {
    // console.log(enrollData);

    var data = enrollData.filter(sampleObj => sampleObj['PLAN NAME'] == sample);
    // console.log(data);

    var year = data.map(year => year['year']);
    var enrollmentChange = data.map(enrollment => enrollment['TYPE OF ENROLLMENT CHANGE']);
    var planType = data.map(type => type['PLAN TYPE']);
    var planName = data.map(pname => pname['PLAN NAME']);
    var name = data.map(ename => ename['NAME']);
    // console.log(year);
    // console.log(enrollmentChange);
    // console.log(planType);
    // console.log(planName);
    // console.log(name);
    buildTable(year, enrollmentChange, planType, planName, name);

    function buildTable(year, enrollmentChange, planType, planName, name) {
      var table = d3.select("#summary-table");
      var tbody = table.select("tbody");
      var trow;
      for (var i = 0; i < 10; i++) {
        trow = tbody.append("tr");
        trow.append("td").text(year[i]);
        trow.append("td").text(enrollmentChange[i]);
        trow.append("td").text(planType[i]);
        trow.append("td").text(planName[i]);
        trow.append("td").text(name[i]);
      }
    }

  });

}

function init() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  d3.json("resources/data/enrollment_comparsion_data.json").then((enrollData) => {

    var data = enrollData.map(pname => pname['PLAN NAME']);
    // console.log(data);

    data.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = data[0];
    // console.log(firstSample);
    enrollmentBarCharts(firstSample);
    enrollmentTable(firstSample);

  });

}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  enrollmentBarCharts(newSample);
  enrollmentTable(newSample)

}

// Initialize the dashboard
init();