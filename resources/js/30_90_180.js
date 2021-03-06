function reviewBarChart(sample) {

    d3.json("resources/data/performance_reviews_report.json").then((data) => {
        console.log(data);

        var data30 = data
            .filter(sampleObj => sampleObj['Review Name'] == '30 Day New Hire Review')
            .filter(sampleObj => sampleObj['Review Detail Status'] == 'Not Started');
        console.log(data30);

        var data90 = data
            .filter(sampleObj => sampleObj['Review Name'] == '90 Day New HIre Review')
            .filter(sampleObj => sampleObj['Review Detail Status'] == 'Not Started');
        console.log(data90);

        var data180 = data
            .filter(sampleObj => sampleObj['Review Name'] == '180 Day New Hire Review')
            .filter(sampleObj => sampleObj['Review Detail Status'] == 'Not Started');
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

        var sortedreview30 = review30.sort(function (a, b) {
            return b['count'] - a['count']
        });

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
            title: '30-90-180 Reviews Not Started',
            barmode: 'group',
            xaxis: { title: 'Business Unit Description' },
            yaxis: { title: '# of Employees' },
        };

        var config = { responsive: true }

        Plotly.newPlot('30-90-180', data, layout, config);

    });

}

function reviewPieChart(sample) {

    d3.json("resources/data/performance_reviews_report.json").then((data) => {
        console.log(data);

        // Create an array of each region
        var reviewData = data

        console.log(reviewData);

        var reviewDays = [];
        reviewData.reduce(function (item, value) {
            if (!item[value['Review Name']]) {
                item[value['Review Name']] = { 'Review Name': value['Review Name'], 'count': 0 };
                reviewDays.push(item[value['Review Name']])
            }
            item[value['Review Name']]['count'] += value['count'];
            return item;
        }, {});

        // Display the pie chart
        var data = [{
            values: reviewDays.map(item => item['count']),
            labels: reviewDays.map(item => item['Review Name']),
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

function init() {

    d3.json("resources/data/performance_reviews_report.json").then((data) => {

        // Creating a function to find unique values
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        var data = data.map(yr => yr['Hire Year']);
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
        
        reviewBarChart(firstSample);
        reviewPieChart(firstSample);

    });

}

function optionChanged(newSample) {

    // Fetch new data each time a new sample is selected
    reviewBarChart(newSample);
    reviewPieChart(newSample);
}

//Initialize the dashboard
init();