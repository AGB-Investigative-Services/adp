function newHireBarChart(sample) {

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