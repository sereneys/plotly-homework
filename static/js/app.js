function buildChart(sampleName) {
    var selector = d3.select("#sample-metadata")

    d3.json("https://sereneys.github.io/plotly-homework/data/samples.json").then((data) => {

        var samples = data.samples;
        var filterResult = samples.filter(sample => sample.id == sampleName);
        var result = filterResult[0];

        var ids = result.otu_ids;
        var sample_values = result.sample_values;
        var otu_labels = result.otu_labels;
        
        //Create bar chart
        var yticks = ids.slice(0,10).map(ID => `OTU ${ID}`).reverse();
        
        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        var barLayout = {
            title: "Top 10 Bacteria Cultures",
            margin: {t: 25, l: 150}
        };

        Plotly.newPlot("bar", barData, barLayout)

        //Create bubble chart

        var bubbleData = [
            {
                x: ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: ids,
                    colorscale: "Earth",
                }
            }
        ];

        var bubbleLayout = {
            title: "Bacteria Cultures Per Samples",
            margin:{ t: 30},
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    });
}

function buildMetaData(sampleName) {

    d3.json("https://sereneys.github.io/plotly-homework/data/samples.json").then((data) => {

        var samples = data.metadata;
        var filterResult = samples.filter(sample => sample.id == sampleName);
        var result = filterResult[0];

        var selector = d3.select("#sample-metadata");

        selector.html("");

        Object.entries(result).forEach(([key, value]) => {
            selector.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

d3.selectAll("#selDataset").on("change", optionChanged());

function init() {

    var selector = d3.select("#selDataset");

    d3.json("https://sereneys.github.io/plotly-homework/data/samples.json").then((data) => {

        var names = data.names;

        names.forEach((sample) => {
            selector.append("option").property("value", sample).text(sample); 
        });
        
        var defaultName = names[0];
        buildChart(defaultName);
        buildMetaData(defaultName);
    });
}

function optionChanged(newSample) {
    buildChart(newSample);
    buildMetaData(newSample);
}

init();