;(function() {

	var margin = { top: 10, right: 10, bottom: 100, left: 50 };
	var width = 400;
	var height = 300;

	var dataXRange = { min: 40, max: 100 };
	var dataYRange = { min: 0, max: 100 };
	var xAxisLabelHeader = "X Header";
	var yAxisLabelHeader = "Y Header";
	var circleRadius = 4;

	var data;
	var chart;
	var chartWidth;
	var chartHeight;

	init();

	function init() {

		chartWidth = width - margin.left - margin.right;
		chartHeight = height - margin.top - margin.bottom;

		// load data from json
		d3.json("./data/stream_1.json", function(error, json) {
			if (error) {
				return console.warn(error);
			} else {
				data = json;
				console.log("JSON loaded");
				initializeChart();
				createAxes();

				drawDots();

				// you could load more data here using d3.json() again...
				d3.json("./data/stream_2.json", function(err, json){
					if(err){
						return console.warn(err);
					}else{
						data2 = json;
						console.log("JSON2 loaded");
						initializeChart2();
						createAxes2();
						drawtriangles();

					}


				})

			}
		});

	}//end init

	function initializeChart() {
		chart1 = d3.select("#chartDiv").append("svg")
			.attr("width", width)
			.attr("height", height);

		chart1.plotArea = chart1.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	}

	function initializeChart2() {
		chart2 = d3.select("#otherDiv").append("svg")
			.attr("width", width)
			.attr("height", height);

		chart2.plotArea = chart2.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	}




	function createAxes() {

		// x axis
		chart1.xScale = d3.scaleLinear()
			.domain([dataXRange.min, dataXRange.max])
			.range([0, chartWidth]);

		chart1.xAxis = d3.axisBottom()
			.tickSizeOuter(0)
			.scale(chart1.xScale);

		chart1.xAxisContainer = chart1.append("g")
			.attr("class", "x axis scatter-xaxis")
			.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
			.call(chart1.xAxis);

		// x axis header label
		chart1.append("text")
			.attr("class", "x axis scatter-xaxis")
			.style("font-size", "12px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + (margin.bottom / 2.0)) + ")")
			.text(xAxisLabelHeader);

		// y axis labels
		chart1.yScale = d3.scaleLinear()
			.domain([dataYRange.min, dataYRange.max])
			.range([chartHeight, 0]);

		chart1.yAxis = d3.axisLeft()
			.scale(chart1.yScale);

		chart1.yAxisContainer = chart1.append("g")
			.attr("class", "y axis scatter-yaxis")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
			.call(chart1.yAxis);

		// y axis header label
		chart1.append('text')
			.style("font-size", "12px")
			.attr("class", "heatmap-yaxis")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left / 2.0) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
			.text(yAxisLabelHeader);
	}

	function createAxes2() {

		// x axis

		chart2.xScale = d3.scaleLinear()
			.domain([dataXRange.min, dataXRange.max])
			.range([0, chartWidth]);

		chart2.xAxis = d3.axisBottom()
			.tickSizeOuter(0)
			.scale(chart2.xScale);

		chart2.xAxisContainer = chart2.append("g")
			.attr("class", "x axis scatter-xaxis")
			.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
			.call(chart2.xAxis);

		// x axis header label
		chart2.append("text")
			.attr("class", "x axis scatter-xaxis")
			.style("font-size", "12px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + (margin.bottom / 2.0)) + ")")
			.text(xAxisLabelHeader);

		// y axis labels
		chart2.yScale = d3.scaleLinear()
			.domain([dataYRange.min, dataYRange.max])
			.range([chartHeight, 0]);

		chart2.yAxis = d3.axisLeft()
			.scale(chart2.yScale);

		chart2.yAxisContainer = chart2.append("g")
			.attr("class", "y axis scatter-yaxis")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
			.call(chart2.yAxis);

		// y axis header label
		chart2.append('text')
			.style("font-size", "12px")
			.attr("class", "heatmap-yaxis")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left / 2.0) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
			.text(yAxisLabelHeader);
	}




	function drawDots() {
		// do something with the data here!

		// plot dots
		var dots = chart1.plotArea.selectAll(".dot")
			.data(data)
			.enter().append("circle")
				.attr("class", "dot")
				.attr("cx", function(d) { return chart1.xScale(d.xVal); })
				.attr("cy", function(d) { return chart1.yScale(d.yVal); })
				.attr("r", circleRadius)
				.style("fill","#0000ff")
				.on("mouseover", function(){
					d3.select(this)
					.style("fill", "red");
				})
				.on("mouseout", function(){
					d3.select(this)
					.style("fill", "#0000ff");

				})
				.on("click", function(d) {
					console.log("circle: ", d.xVal, ", ", d.yVal);
					chart2.selectAll("path")  // cange this to point for no error
						.attr("transform", function(d) { return "translate(" + chart2.xScale(d.xVal) + "," + chart2.yScale(d.yVal) + ")"; })
						.filter(function(f){
							return f.xVal == d.xVal;
						})
						.style("fill", "yellow");
				});
	}


	function drawtriangles(){

		var dots = chart2.plotArea.selectAll(".point")
			.data(data2)
			.enter().append("path")
			.attr("class", "point")
      		.attr("d", d3.symbol().type(d3.symbolSquare))
      		.style("fill", "#428942")
      		.on("mouseover", function(){
					d3.select(this)
					.style("fill", "red");
				})
			.on("mouseout", function(){
					d3.select(this)
					.style("fill", "#428942");

				})
      		.attr("transform", function(d) { return "translate(" + chart2.xScale(d.xVal) + "," + chart2.yScale(d.yVal) + ")"; })
      		.on("click", function(d) {
					console.log("triangle: ", d.xVal, ", ", d.yVal);
					chart1.selectAll("circle")
						.filter(function(f){
							return f.xVal == d.xVal;
						})
						.style("fill", "yellow");
				});
	}
	

})();
