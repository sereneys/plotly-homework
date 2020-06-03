
function init() {

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {

        var names = data.names;

        names.forEach((sample) => {
            selector.append("option").property("value", sample).text(sample); 
        });

    });

}

init();