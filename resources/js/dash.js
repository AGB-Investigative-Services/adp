function dashBarCharts(sample) {

  d3.json("resources/data/custom_hire_data.json").then((dashData) => {
    // console.log(dashData);

    var data = dashData.filter(sampleObj => sampleObj['Hire Year'] == sample);
    // console.log(data);
    var term = data.filter(term => term['Termination Date'] > 0);
    // console.log(term);


    // (https://stackoverflow.com/questions/29364262/how-to-group-by-and-sum-array-of-object)
    var termination = [];
    // (https://www.w3schools.com/jsref/jsref_reduce.asp)
    term.reduce(function (trm, value) {
      if (!trm[value['Business Unit Description']]) {
        trm[value['Business Unit Description']] = { 'Business Unit Description': value['Business Unit Description'], 'count': 0 };
        termination.push(trm[value['Business Unit Description']])
      }
      trm[value['Business Unit Description']]['count'] += value['count'];
      return trm;
    }, {});

    var retention = [];
    data.reduce(function (ret, value) {
      if (!ret[value['Business Unit Description']]) {
        ret[value['Business Unit Description']] = { 'Business Unit Description': value['Business Unit Description'], 'count': 0 };
        retention.push(ret[value['Business Unit Description']])
      }
      ret[value['Business Unit Description']]['count'] += value['count'];
      return ret;
    }, {});

    // console.log(termination);
    // console.log(retention);

    var sortedretention = retention.sort(function (a, b) {
      return b['count'] - a['count']
    });

    console.log(sortedretention);

    var trace1 = {
      type: 'bar',
      x: termination.map(row => row['Business Unit Description']),
      y: termination.map(row => row['count']),
      text: "Turnover Rate",
      text: termination.map(row => row['count']),
      textposition: 'auto',
      name: 'Turnover Rate',
    };

    var trace2 = {
      type: 'bar',
      x: retention.map(row => row['Business Unit Description']),
      y: retention.map(row => row['count']),
      text: retention.map(row => row['count']),
      textposition: 'auto',
      name: 'Retention Rate',
    };

    var data = [trace1, trace2];

    var layout = {
      title: 'Status of New Hire by Region',
      barmode: 'group',
      xaxis: { title: 'Business Unit Description' },
      yaxis: { title: 'Retention Rates and Turnover Rates' },
    };

    var config = { responsive: true }

    Plotly.newPlot('retentionRate', data, layout, config);

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
    console.log(dashData);

    var data = dashData.filter(sampleObj => sampleObj['Hire Year'] == sample);

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

function dataByRegion(sample) {
  d3.json("resources/data/custom_hire_data.json").then((dashData) => {
    // console.log(dashData);

    // Create an array of each region
    var admin = dashData
      .filter(item => item['Business Unit Description'] == 'Administration')
      .filter(item => item['Hire Year'] == sample);

    var aliciaRegion = dashData
      .filter(item => item['Business Unit Description'] == 'Alicia\'s Region')
      .filter(item => item['Hire Year'] == sample);
    
    var administration = [];
    admin.reduce(function (adm, value) {
      if (!adm[value['Position Status']]) {
        adm[value['Position Status']] = { 'Position Status': value['Position Status'], 'count': 0 };
        administration.push(adm[value['Position Status']])
      }
      adm[value['Position Status']]['count'] += value['count'];
      return adm;
    }, {});

    var alicia = [];
    aliciaRegion.reduce(function (ali, value) {
      if (!ali[value['Position Status']]) {
        ali[value['Position Status']] = { 'Position Status': value['Position Status'], 'count': 0 };
        alicia.push(ali[value['Position Status']])
      }
      ali[value['Position Status']]['count'] += value['count'];
      return ali;
    }, {});

    console.log(alicia);

    // Display the pie chart
    var data = [{
      values: administration.map(item => item['count']),
      labels: administration.map(item => item['Position Status']),
      type: "pie"
    }];

    console.log(data);

    var layout = {
      height: 'auto', 
      width: 'auto'
    };

    var config = { responsive: true }

    Plotly.newPlot("pie", data, layout, config);

  });

}

// On change to the DOM, call getData()
d3.selectAll("#selregion").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selregion");
  
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the region's data
  var data = [];

  if (dataset == 'Administration') {
    data = administration;
  }
  else if (dataset == 'Alicia\'s Region') {
    data = alicia;
  }
  else if (dataset == 'Steve\'s Region') {
    data = steve;
  }

  // Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

function init() {

  d3.json("resources/data/custom_hire_data.json").then((dashData) => {

    // Creating a function to find unique values
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var data = dashData.map(yr => yr['Hire Year']);
    var unique = data.filter(onlyUnique);
    var sortedunique = unique.sort(function (a, b) {
      return b - a
    });

    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    sortedunique.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sortedunique[0];

    turnover(firstSample);
    yearlyTurnover(firstSample);
    retention(firstSample);
    yearlyRetention(firstSample);
    dashBarCharts(firstSample);
    // getData();
    dataByRegion(firstSample);

  });

}

function optionChanged(newSample) {

  // Fetch new data each time a new sample is selected
  turnover(newSample);
  yearlyTurnover(newSample);
  retention(newSample);
  yearlyRetention(newSample);
  dashBarCharts(newSample);
  // getData();
  dataByRegion(newSample);
  
}

// Initialize the dashboard
init();