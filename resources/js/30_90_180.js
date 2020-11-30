function newHireBarChart(sample) {

    d3.json("resources/data/Performance_Reviews_Report.json").then((data) => {
        console.log(data);

        var data30 = data.filter(sampleObj => sampleObj['Review Name'] == '30 Day New Hire Review');
        console.log(data30);

        var data90 = data.filter(sampleObj => sampleObj['Review Name'] == '90 Day New Hire Review');
        console.log(data90);

        var data180 = data.filter(sampleObj => sampleObj['Review Name'] == '180 Day New Hire Review');
        console.log(data180);


        // (https://stackoverflow.com/questions/29364262/how-to-group-by-and-sum-array-of-object)
        var hire30 = [];
        // (https://www.w3schools.com/jsref/jsref_reduce.asp)
        data30.reduce(function (hr30, value) {
            if (!hr30[value['Business Unit Description']]) {
                hr30[value['Business Unit Description']] = { 'Business Unit Description': value['Business Unit Description'], 'count': 0 };
                hire30.push(hr30[value['Business Unit Description']])
            }
            hr30[value['Business Unit Description']]['count'] += value['count'];
            return hr30;
        }, {});

        var hire90 = [];
        // (https://www.w3schools.com/jsref/jsref_reduce.asp)
        data90.reduce(function (hr90, value) {
            if (!hr90[value['Business Unit Description']]) {
                hr90[value['Business Unit Description']] = { 'Business Unit Description': value['Business Unit Description'], 'count': 0 };
                hire90.push(hr90[value['Business Unit Description']])
            }
            hr90[value['Business Unit Description']]['count'] += value['count'];
            return hr90;
        }, {});


        console.log(hire30);
        console.log(hire90);

        var sortedretention = hire30.sort(function (a, b) {
            return b['count'] - a['count']
        });

        console.log(sortedhire30);

        var trace1 = {
            type: 'bar',
            x: hire30.map(row => row['Business Unit Description']),
            y: hire30.map(row => row['count']),
            text: "Turnover Rate",
            text: hire30.map(row => row['count']),
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

        newHireBarChart(firstSample);

    });

}

function optionChanged(newSample) {

    // Fetch new data each time a new sample is selected
    newHireBarChart(newSample);
}

//Initialize the dashboard
init();