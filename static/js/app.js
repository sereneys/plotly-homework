function buildChart(sampleName) {
    var selector = d3.select("#sample-metadata")

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var filterResult = samples.filter(sample => sample.id == sampleName);
        var result = filterResult[0];

        var otu_ids = result.otu_ids;
        var sample_values = result.sample_values;
        var otu_labels = result.otu_labels;
        
        //Create bar chart
        var yticks = otu_ids.slice(0,10).map(ID => `OTU ${ID}`).reverse();
        
        var barData = [
            {
                y: yticks,
                x: sample_valuess.slice(0,10).reverse(),
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


    });

}

function buildMetaData(sampleName) {

    d3.json("samples.json").then((data) => {

        var samples = data.metadata;
        var filterResult = samples.filter(sample => sample.id == sampleName);
        var result = filterResult[0];

        var selector = d3.select("#sample-metadata");

        selector.html("");

        Object.defineProperties(result).forEach(([key, value]) => {
            selector.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });

}

d3.selectAll("#selDataset").on("change", optionChange());

function init() {

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {

        var names = data.names;

        names.forEach((sample) => {
            selector.append("option").property("value", sample).text(sample); 
        });
    });

    var defaultName = names[0];
    buildChart(defaultName);
    buildMetaDate(defaultName);

}

function optionChange(newSample) {
    buildChart(newSample);
    buildMetaDate(newSample);
}

init();