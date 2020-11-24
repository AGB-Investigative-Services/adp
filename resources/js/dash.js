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

  var hireData = dashData.map(item => item['Hire Reason Description']);
  var unique_hireData = hireData.filter(onlyUnique);
  var sorted_hireData = unique_hireData.sort(function (a, b) {
    return a - b
  });

  var positionData = dashData.map(item => item['Position Status']);
  var unique_positionData = positionData.filter(onlyUnique);
  var sorted_positionData = unique_positionData.sort(function (a, b) {
    return a - b
  });

  var regionData = dashData.map(item => item['Business Unit Description']);
  var unique_regionData = regionData.filter(onlyUnique);
  var sorted_regionData = unique_regionData.sort(function (a, b) {
    return a - b
  });

  var terminationData = dashData.map(item => item['Voluntary/Involuntary Termination Flag']);
  var unique_terminationData = terminationData.filter(onlyUnique);
  var sorted_terminationData = unique_terminationData.sort(function (a, b) {
    return a - b
  });

  const yearly = sortedunique;
  const hireReason = sorted_hireData;
  const positionStatus = sorted_positionData;
  const region = sorted_regionData;
  const terminationType = sorted_terminationData;
  console.log(yearly);
  console.log(hireReason);
  console.log(positionStatus);
  console.log(region);
  console.log(terminationType);

  state = {
    userInputContainerClicked: false,
    searchTerm: "",
    // tags that render are inside of 'passingTags' object.
    passingTags: {
      search: {
        inputTerm: ""
      },
      yearly: {
        2020: false,
        2019: false,
        2018: false,
        2017: false,
        2016: false,
        2015: false,
        2014: false,
        2013: false,
        2012: false,
        2011: false,
        2010: false,
        2009: false,
        2008: false,
        2006: false,
        1999: false
      },
      hireReason: {
        "New Position": false,
        null: false,
        "Existing Position": false
      },
      positionStatus: {
        "Active": false,
        "Terminated": false,
        "Leave": false,
        "Deceased": false
      },
      region: {
        "Darryl\'s Region": false,
        null: false,
        "Administration": false,
        "Steve\'s Region": false,
        "Odom\'s Region": false,
        "Alicia\'s Region": false,
        "AGB Foundation": false
      },
      terminationType: {
        null: false,
        "Involuntary": false,
        "Voluntary": false
      }
    }
  };

});

import React, { Component } from "react";

class InputTagCollection extends Component {
  render() {
    console.log(this.props.tags);
    const { search, yearly, hireReason, positionStatus, region, terminationType } = this.props.tags;
    return (
      <div id="chosen-tags">
        {search.inputTerm.length ? (
          <div className="collection" onClick={this.props.cancelSearchTag}>
            <h6 onClick={this.props.cancelSearchTag}>{search.inputTerm}</h6>
          </div>
        ) : null}
        {/* ************** YEARLY ************** */}
        {yearly["2020"] ? (
          <div
            className="collection 2020"
            data-name="2020"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2020">2020</h6>
          </div>
        ) : null}
        {yearly["2019"] ? (
          <div
            className="collection 2019"
            data-name="2019"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2019">2019</h6>
          </div>
        ) : null}
        {yearly["2018"] ? (
          <div
            className="collection 2018"
            data-name="2018"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2018">2018</h6>
          </div>
        ) : null}
        {yearly["2017"] ? (
          <div
            className="collection 2017"
            data-name="2017"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2017">2017</h6>
          </div>
        ) : null}
        {yearly["2016"] ? (
          <div
            className="collection 2016"
            data-name="2016"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2016">2016</h6>
          </div>
        ) : null}
        {yearly["2015"] ? (
          <div
            className="collection 2015"
            data-name="2015"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2015">2015</h6>
          </div>
        ) : null}
        {yearly["2014"] ? (
          <div
            className="collection 2014"
            data-name="2014"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2014">2014</h6>
          </div>
        ) : null}
        {yearly["2013"] ? (
          <div
            className="collection 2013"
            data-name="2013"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2013">2013</h6>
          </div>
        ) : null}
        {yearly["2012"] ? (
          <div
            className="collection 2012"
            data-name="2012"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2012">2012</h6>
          </div>
        ) : null}
        {yearly["2011"] ? (
          <div
            className="collection 2011"
            data-name="2011"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2011">2011</h6>
          </div>
        ) : null}
        {yearly["2010"] ? (
          <div
            className="collection 2010"
            data-name="2010"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2010">2010</h6>
          </div>
        ) : null}
        {yearly["2010"] ? (
          <div
            className="collection 2010"
            data-name="2010"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2010">2010</h6>
          </div>
        ) : null}
        {yearly["2009"] ? (
          <div
            className="collection 2009"
            data-name="2009"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2009">2009</h6>
          </div>
        ) : null}
        {yearly["2008"] ? (
          <div
            className="collection 2008"
            data-name="2008"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2008">2008</h6>
          </div>
        ) : null}
        {yearly["2007"] ? (
          <div
            className="collection 2007"
            data-name="2007"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2007">2007</h6>
          </div>
        ) : null}
        {yearly["2006"] ? (
          <div
            className="collection 2006"
            data-name="2006"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="2006">2006</h6>
          </div>
        ) : null}
        {yearly["1999"] ? (
          <div
            className="collection 1999"
            data-name="1999"
            onClick={e => this.props.allFilterClickListener(e, "yearly")}
          >
            <h6 data-name="1999">1999</h6>
          </div>
        ) : null}
        {/* ************** hireReason ************** */}
        {hireReason["New Position"] ? (
          <div
            className="collection"
            data-name="New Position"
            onClick={e => this.props.allFilterClickListener(e, "hireReason")}
          >
            <h6 data-name="New Position">New Position</h6>
          </div>
        ) : null}
        {hireReason["Existing Position"] ? (
          <div
            className="collection"
            data-name="Existing Position"
            onClick={e => this.props.allFilterClickListener(e, "hireReason")}
          >
            <h6 data-name="Existing Position">Existing Position</h6>
          </div>
        ) : null}
        {/* ************** positionStatus ************** */}
        {positionStatus.Active ? (
          <div
            className="collection"
            data-name="Active"
            onClick={e => this.props.allFilterClickListener(e, "positionStatus")}
          >
            <h6 data-name="Active">Active</h6>
          </div>
        ) : null}
        {positionStatus.Terminated ? (
          <div
            className="collection"
            data-name="Terminated"
            onClick={e => this.props.allFilterClickListener(e, "positionStatus")}
          >
            <h6 data-name="Terminated">Terminated</h6>
          </div>
        ) : null}
        {positionStatus.Leave ? (
          <div
            className="collection"
            data-name="Leave"
            onClick={e => this.props.allFilterClickListener(e, "positionStatus")}
          >
            <h6 data-name="Leave">Leave</h6>
          </div>
        ) : null}
        {positionStatus.Deceased ? (
          <div
            className="collection"
            data-name="Deceased"
            onClick={e => this.props.allFilterClickListener(e, "positionStatus")}
          >
            <h6 data-name="Deceased">Deceased</h6>
          </div>
        ) : null}
        {/* ************** region ************** */}
        {region["Darryl\'s Region"] ? (
          <div
            className="collection"
            data-name="Darryl\'s Region"
            onClick={e => this.props.allFilterClickListener(e, "region")}
          >
            <h6 data-name="Darryl\'s Region">Darryl's Region</h6>
          </div>
        ) : null}
        {region.Administration ? (
          <div
            className="collection"
            data-name="Administration"
            onClick={e => this.props.allFilterClickListener(e, "region")}
          >
            <h6 data-name="Administration">Administration</h6>
          </div>
        ) : null}
        {region["Steve\'s Region"] ? (
          <div
            className="collection"
            data-name="Steve\'s Region"
            onClick={e => this.props.allFilterClickListener(e, "region")}
          >
            <h6 data-name="Steve\'s Region">Steve's Region</h6>
          </div>
        ) : null}
        {region["Odom\'s Region"] ? (
          <div
            className="collection"
            data-name="Odom\'s Region"
            onClick={e => this.props.allFilterClickListener(e, "region")}
          >
            <h6 data-name="Odom\'s Region">Odom's Region</h6>
          </div>
        ) : null}
        {region["Alicia\'s Region"] ? (
          <div
            className="collection"
            data-name="Alicia\'s Region"
            onClick={e => this.props.allFilterClickListener(e, "region")}
          >
            <h6 data-name="Alicia\'s Region">Alicia's Region</h6>
          </div>
        ) : null}
        {region["AGB Foundation"] ? (
          <div
            className="collection"
            data-name="AGB Foundation"
            onClick={e => this.props.allFilterClickListener(e, "region")}
          >
            <h6 data-name="AGB Foundation">AGB Foundation</h6>
          </div>
        ) : null}
        {/* ************** terminationType ************** */}
        {terminationType.Involuntary ? (
          <div
            className="collection"
            data-name="Involuntary"
            onClick={e => this.props.allFilterClickListener(e, "terminationType")}
          >
            <h6 data-name="Involuntary">Involuntary</h6>
          </div>
        ) : null}
        {terminationType.Voluntary ? (
          <div
            className="collection"
            data-name="Voluntary"
            onClick={e => this.props.allFilterClickListener(e, "terminationType")}
          >
            <h6 data-name="Voluntary">Voluntary</h6>
          </div>
        ) : null}
      </div>
    );
  }
}

export default InputTagCollection;

// **************** UNIVERSAL Filter ****************
allFilterClickListener = (e, filterProp) => {
  console.log("FILTER clicked", e.target.dataset.name);
  const name = e.target.dataset.name;
  this.setState(prevState => ({
    passingTags: {
      ...prevState.passingTags,
      [filterProp]: {
        ...prevState.passingTags[filterProp],
        [name]: !prevState.passingTags[filterProp][name]
      }
    }
  }));
};

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