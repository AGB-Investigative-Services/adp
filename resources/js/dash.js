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

function turnover(sample) {

  d3.json("resources/data/custom_hire_data.json").then((dashData) => {
    // console.log(dashData);

    var data = dashData;//.filter(sampleObj => sampleObj['PLAN NAME'] == sample);
    // console.log(data);

    var term = data.map(term => term['Termination Date']);
    // console.log(term);

    function filter_array_values(arr) {
      arr = arr.filter(isEligible);
      return arr;
    }
    
    function isEligible(value) {
      if(value !== false || value !== null || value !== 0 || value !== "") {
        return value;
      }
    }
    // console.log(filter_array_values(term));

    var termFiltered = filter_array_values(term);
    // console.log(termFiltered);

    // Total Net Sum Number Chart
    var hireTotal = data.length;
    var termTotal = termFiltered.length;
    //  console.log(termTotal);

    // for (i = 0; i < data.length; i++) {
    //   hireTotal += data[i]['count'];
    // }
    // console.log(hireTotal);

    var total = termTotal / hireTotal;
    // console.log(total);

    // (https://plotly.com/python/indicator/)
    var data = [
      {
        type: "indicator",
        mode: "number",
        value: total,
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
              // title: { text: "Overall Turnover Rate" },
              mode: "number+delta",
              // delta: { reference: termTotal }
            }
          ]
        }
      }
    };

    var config = { responsive: true }

    Plotly.newPlot('turnover', data, layout, config);

  });
}

function yearlyTurnover(sample) {

  d3.json("resources/data/custom_hire_data.json").then((dashData) => {
    // console.log(dashData);

    var data = dashData.filter(sampleObj => sampleObj['Hire Year'] == sample);
    // console.log(data);

    var term = data.map(term => term['Termination Date']);
    // console.log(term);

    function filter_array_values(arr) {
      arr = arr.filter(isEligible);
      return arr;
    }
    
    function isEligible(value) {
      if(value !== false || value !== null || value !== 0 || value !== "") {
        return value;
      }
    }
    // console.log(filter_array_values(term));

    var termFiltered = filter_array_values(term);
    // console.log(termFiltered);

    // Total Net Sum Number Chart
    var hireTotal = data.length;
    var termTotal = termFiltered.length;
    // console.log(hireTotal);
    // console.log(termTotal);

    var total = termTotal / hireTotal;
    // console.log(total);

    // var prefix = d3.format("%");
    // console.log( prefix(total));

    // (https://plotly.com/python/indicator/)
    var data = [
      {
        type: "indicator",
        mode: "number",
        value: total,
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
              title: { text: sample},
              // mode: "number+delta",
              // delta: { reference: hireTotal, relative: true}
            }
          ]
        }
      }
    };

    var config = { responsive: true }

    Plotly.newPlot('yearlyTurnover', data, layout, config);

  });
}

function retention(sample) {

  d3.json("resources/data/custom_hire_data.json").then((dashData) => {
    // console.log(dashData);

    var data = dashData;//.filter(sampleObj => sampleObj['PLAN NAME'] == sample);
    // console.log(data);

    // (https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript)
    // Filtering "Position Status" for 'Active' people
    const active = data.filter(act => act['Position Status'] == 'Active');
    // console.log(active);

    // Filterng the array for Distinct values of "Payroll Name"
    const key = 'Payroll Name';

    const uniquePeople = [...new Map(active.map(item => [item[key], item])).values()];
    // console.log(uniquePeople);

    // Filtering "uniquePeople" array for all people who has worded more than one year to find retention people
    var retentionPeople = uniquePeople.filter(uni => uni['Years of Service'] >= 1 );
    // console.log(retentionPeople);

    // Creating total count
    var uniquePeopleCount = uniquePeople.length;
    var retentionPeopleCount = retentionPeople.length;
    // console.log(uniquePeopleCount);
    // console.log(retentionPeopleCount);

    // Solution for retention Rate
    var retentionRate = retentionPeopleCount / uniquePeopleCount
    // console.log(retentionRate);

    // (https://plotly.com/python/indicator/)
    var data = [
      {
        type: "indicator",
        mode: "number",
        value: retentionRate,
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
              // title: { text: "Overall Retention Rate" },
              mode: "number",
              // delta: { reference: termTotal }
            }
          ]
        }
      }
    };

    var config = { responsive: true }

    Plotly.newPlot('retention', data, layout, config);


  });
}

function yearlyRetention(sample) {

  d3.json("resources/data/custom_hire_data.json").then((dashData) => {
    // console.log(dashData);

    var data = dashData.filter(sampleObj => sampleObj['Hire Year'] == sample);
    // console.log(data);

    // (https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript)
    // Filtering "Position Status" for 'Active' people
    const active = data.filter(act => act['Position Status'] == 'Active');
    // console.log(active);

    // Filterng the array for Distinct values of "Payroll Name"
    const key = 'Payroll Name';

    const uniquePeople = [...new Map(active.map(item => [item[key], item])).values()];
    // console.log(uniquePeople);

    // Filtering "uniquePeople" array for all people who has worded more than one year to find retention people
    var retentionPeople = uniquePeople.filter(uni => uni['Years of Service'] >= 1 );
    // console.log(retentionPeople);

    // Creating total count
    var uniquePeopleCount = uniquePeople.length;
    var retentionPeopleCount = retentionPeople.length;
    // console.log(uniquePeopleCount);
    // console.log(retentionPeopleCount);

    // Solution for retention Rate
    var retentionRate = retentionPeopleCount / uniquePeopleCount
    // console.log(retentionRate);

    // (https://plotly.com/python/indicator/)
    var data = [
      {
        type: "indicator",
        mode: "number",
        value: retentionRate,
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
              title: { text: sample + "<br><span style='font-size:0.8em;color:gray'>Worked one year or greater</span>" },
              // mode: "number",
              // delta: { reference: termTotal }
            }
          ]
        }
      }
    };

    var config = { responsive: true }

    Plotly.newPlot('yearlyRetention', data, layout, config);


  });
}

function init() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  d3.json("resources/data/custom_hire_data.json").then((dashData) => {
    // console.log(dashData);

    var data = dashData.map(yr => yr['Hire Year']);

    // finding unique values
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var unique = data.filter(onlyUnique);
    // console.log(unique);

    var sortedunique = unique.sort(function (a, b) {
      return b - a
    });

    sortedunique.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sortedunique[0];
    // console.log(firstSample);
    turnover(firstSample);
    yearlyTurnover(firstSample);
    retention(firstSample);
    yearlyRetention(firstSample);

  });

}

function optionChanged(newSample) {

  // Fetch new data each time a new sample is selected
  turnover(newSample);
  yearlyTurnover(newSample);
  retention(newSample);
  yearlyRetention(newSample);
  
}

// Initialize the dashboard
init();