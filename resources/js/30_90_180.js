function newHireBarChart(sample) {

    d3.json("resources/data/performance_reviews_report.json").then((data) => {
        console.log(data);

        var data30 = data.filter(sampleObj => sampleObj['Review Name'] == '30 Day New Hire Review');
        console.log(data30);

        var data90 = data.filter(sampleObj => sampleObj['Review Name'] == '90 Day New HIre Review');
        console.log(data90);

        var data180 = data.filter(sampleObj => sampleObj['Review Name'] == '180 Day New Hire Review');
        console.log(data180);


        // (https://stackoverflow.com/questions/29364262/how-to-group-by-and-sum-array-of-object)
        var review30 = [];
        // (https://www.w3schools.com/jsref/jsref_reduce.asp)
        data30.reduce(function (item, value) {
            if (!item[value['Business Unit Description']]) {
                item[value['Business Unit Description']] = { 'Business Unit Description': value['Business Unit Description'], 'count': 0 };
                review30.push(item[value['Business Unit Description']])
            }
            item[value['Business Unit Description']]['count'] += value['count'];
            return item;
        }, {});

        var review90 = [];
        data90.reduce(function (item, value) {
            if (!item[value['Business Unit Description']]) {
                item[value['Business Unit Description']] = { 'Business Unit Description': value['Business Unit Description'], 'count': 0 };
                review90.push(item[value['Business Unit Description']])
            }
            item[value['Business Unit Description']]['count'] += value['count'];
            return item;
        }, {});

        var review180 = [];
        data180.reduce(function (item, value) {
            if (!item[value['Business Unit Description']]) {
                item[value['Business Unit Description']] = { 'Business Unit Description': value['Business Unit Description'], 'count': 0 };
                review180.push(item[value['Business Unit Description']])
            }
            item[value['Business Unit Description']]['count'] += value['count'];
            return item;
        }, {});


        console.log(review30);
        console.log(review90);

        var sortedreview30 = review30.sort(function (a, b) {
            return b['count'] - a['count']
        });

        console.log(sortedreview30);

        var trace1 = {
            type: 'bar',
            x: review30.map(row => row['Business Unit Description']),
            y: review30.map(row => row['count']),
            text: review30.map(row => row['count']),
            textposition: 'auto',
            name: '30 Day New Hire Review',
        };

        var trace2 = {
            type: 'bar',
            x: review90.map(row => row['Business Unit Description']),
            y: review90.map(row => row['count']),
            text: review90.map(row => row['count']),
            textposition: 'auto',
            name: '90 Day New Hire Review',
        };

        var trace3 = {
            type: 'bar',
            x: review180.map(row => row['Business Unit Description']),
            y: review180.map(row => row['count']),
            text: review180.map(row => row['count']),
            textposition: 'auto',
            name: '180 Day New Hire Review',
        };

        var data = [trace1, trace2, trace3];

        var layout = {
            title: 'Status of New Hire by Region',
            barmode: 'group',
            xaxis: { title: 'Business Unit Description' },
            yaxis: { title: 'Retention Rates and Turnover Rates' },
        };

        var config = { responsive: true }

        Plotly.newPlot('30-90-180', data, layout, config);

    });

}

function init() {

    d3.json("resources/data/performance_reviews_report.json").then((dashData) => {

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