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

      tbody.html("");

      var trow;
      for (var i = 0; i < 50; i++) {
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

function keptCount(sample) {

  d3.json("resources/data/enrollment_comparsion_data.json").then((enrollData) => {
    // console.log(enrollData);

    var data = enrollData;//.filter(sampleObj => sampleObj['PLAN NAME'] == sample);
    // console.log(data);

    var kept = data.filter(coverage => coverage['TYPE OF ENROLLMENT CHANGE'] == 'Kept Coverage'); 
    // console.log(kept);
    var year2021 = kept.filter(year => year.year == "2021");
    var year2020 = kept.filter(year => year.year == "2020");
    // console.log(year2020);


    // Total Net Sum Number Chart
    var ktotal21 = 0
    var ktotal20 = 0

    for (i = 0; i < year2021.length; i++) {
      ktotal21 += year2021[i]['# of Employees'];
    }
    // console.log(ktotal21);

    for (i = 0; i < year2020.length; i++) {
      ktotal20 += year2020[i]['# of Employees'];
    }
    // console.log(ktotal20);

    // (https://plotly.com/python/indicator/)
    var data = [
      {
        type: "indicator",
        mode: "number+delta",
        value: ktotal21,
        domain: { row: 1, column: 0 }
      }
    ];

    var layout = {
      height: 150,
      margin: { t: 50, b: 10, l: 10, r: 10 },
      grid: { rows: 0, columns: 0, pattern: "independent" },
      template: {
        data: {
          indicator: [
            {
              title: { text: "2021 Kept Coverages Total" },
              mode: "number+delta",
              delta: { reference: ktotal20 }
            }
          ]
        }
      }
    };

    var config = { responsive: true }

    Plotly.newPlot('keptCount', data, layout, config);

  });
}

function init() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  d3.json("resources/data/enrollment_comparsion_data.json").then((enrollData) => {

    var data = enrollData.map(pname => pname['PLAN NAME']);
    // console.log(data);

    // finding unique values
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var unique = data.filter(onlyUnique);
    // console.log(unique);

    unique.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = unique[0];
    // console.log(firstSample);
    enrollmentBarCharts(firstSample);
    enrollmentTable(firstSample);
    keptCount(firstSample);

  });

}

function optionChanged(newSample) {

  // Fetch new data each time a new sample is selected
  enrollmentBarCharts(newSample);
  enrollmentTable(newSample);
  keptCount(newSample);
  
}

// Initialize the dashboard
init();