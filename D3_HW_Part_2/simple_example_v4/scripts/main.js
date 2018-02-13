;(function() {

	var margin = { top: 10, right: 10, bottom: 100, left: 50 };
	var width = 400;
	var height = 300;

	var dataXRange = { min: 0, max: 40 };
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
				console.log("JSON loaded", data[0]);
				initializeChart();
				createAxes();

				drawDots();

				// you could load more data here using d3.json() again...

			}
		});

	}//end init

	function initializeChart() {
		chart = d3.select("#chartDiv").append("svg")
			.attr("width", width)
			.attr("height", height);

		chart.plotArea = chart.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	}

	function createAxes() {

		// x axis
		chart.xScale = d3.scaleLinear()
			.domain([dataXRange.min, dataXRange.max])
			.range([0, chartWidth]); //will draw the line, NOT THE TICKS!!!!

		chart.xAxis = d3.axisBottom()
			.tickSizeOuter(10)  //will draw the end of the X AXIS ticks!
			.scale(chart.xScale);

		chart.xAxisContainer = chart.append("g")
			.attr("class", "x axis scatter-xaxis")
			.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
			.call(chart.xAxis);

		// x axis header label
		chart.append("text")
			.attr("class", "x axis scatter-xaxis")
			.style("font-size", "12px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + (margin.bottom / 2.0)) + ")")
			.text(xAxisLabelHeader);

		// y axis labels
		chart.yScale = d3.scaleLinear()
			.domain([dataYRange.min, dataYRange.max])
			.range([chartHeight, 0]);

		chart.yAxis = d3.axisLeft()
			.scale(chart.yScale);

		chart.yAxisContainer = chart.append("g")
			.attr("class", "y axis scatter-yaxis")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
			.call(chart.yAxis);

		// y axis header label
		chart.append('text')
			.style("font-size", "12px")
			.attr("class", "heatmap-yaxis")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left / 2.0) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
			.text(yAxisLabelHeader);
	}

	function drawDots() {
		// do something with the data here!
		var list = [];
		var xlist = [];
		var ylist = [];

		var timer = d3.timer(timerCallback);
		var i = 0
		// console.log(123);

		function timerCallback(elapsed){

			// console.log(elapsed);

			if(elapsed > 150){
			list.push(data[i]);
			i ++;

			//Piyush

			if(i==20){
				console.log(list[0].xVal)
				list.shift();
				console.log(list[0].xVal)
			}
			//

			// console.log(elapsed)

			// console.log(list)
			//console.log(elapsed)

			updateCircles(elapsed);
			updateAxis();

			timer.restart(timerCallback);
			}
		}


		function updateCircles(elapsed){
			var dots = chart.plotArea.selectAll(".dot")
		 	.data(list)


		 dots.enter()
		 	.append("circle")
		 	.attr("class", "dot")
		 	.attr("cx", function(d,i) { return chart.xScale(d.xVal);})
		 	.attr("cy", function(d){ return chart.yScale(d.yVal);})
		 	.attr("r", circleRadius)
		 	.style("fill", "blue")
		 	.merge(dots)
		 	.transition()
		 	.duration(2500)
		 	.attr("cx", function(d, i){ return chart.xScale(d.xVal - elapsed);})

		 dots.exit().transition()
		 	.duration(1000)
		 	.style("fill", "orange")
		 	.remove();

		}


		function updateAxis(){

			chart.xScale = d3.scaleLinear()
			.domain([dataXRange.min, dataXRange.max])
			.range([0, chartWidth]); //will draw the line, NOT THE TICKS!!!!

		chart.xAxis = d3.axisBottom()
			.tickSizeOuter(10)  //will draw the end of the X AXIS ticks!
			.scale(chart.xScale);

		chart.xAxisContainer = chart.append("g")
			.attr("class", "x axis scatter-xaxis")
			.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
			.call(chart.xAxis);

		// x axis header label
		chart.append("text")
			.attr("class", "x axis scatter-xaxis")
			.style("font-size", "12px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + (margin.bottom / 2.0)) + ")")
			.text(xAxisLabelHeader);

		// y axis labels
		chart.yScale = d3.scaleLinear()
			.domain([dataYRange.min, dataYRange.max])
			.range([chartHeight, 0]);

		chart.yAxis = d3.axisLeft()
			.scale(chart.yScale);

		chart.yAxisContainer = chart.append("g")
			.attr("class", "y axis scatter-yaxis")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
			.call(chart.yAxis);

		// y axis header label
		chart.append('text')
			.style("font-size", "12px")
			.attr("class", "heatmap-yaxis")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left / 2.0) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
			.text(yAxisLabelHeader);

		}

		
/////////////////////////////////  EARLIER CODE //////////////////////////
		// plot dots
	// 	 for(var i = 0; i <data.length; i++){
	// 	 	//dataxval = data[i].xVal;
	// 	 	//datayval = data[i].yVal;
	// 	 	list.push(data[i])
	// 	 	//console.log(list);
	// 	 	// list2 = [1,2,3]
	// 	 	// console.log(list2);

	// 	 	console.log(list)


	// 	 	var dots = chart.plotArea.selectAll(".dot")
	// 	 	.data(list)
	// 	 	.enter()
	// 	 	.append("circle")
	// 	 	.attr("class", "dot")
	// 	 	.attr("cx", function(d,i) { return chart.xScale(d.xVal);})
	// 	 	.attr("cy", function(d){ return chart.yScale(d.yVal);})
	// 	 	.attr("r", circleRadius)
	// 	 	.transition()
	// 	 	.delay(function(d,i){ return 100*i; })
	// 	 	.duration(1500)
	// 	 	.attr("cx", function(d){ return chart.xScale(d.xVal-60);})
 // }


 ////////////////////////////////// DIVISION //////////////////////////////


		// var dots = chart.plotArea.selectAll(".dot")
		// 	.data(data)
		// 	.enter().append("circle")
		// 		.attr("class", "dot")
		// 		.attr("cx", function(d) { return chart.xScale(d.xVal); })
		// 		.attr("cy", function(d) { return chart.yScale(d.yVal); })
		// 		.attr("r", circleRadius)
		// 		.transition()
		// 		.duration(2500)
		// 		.attr("cx", function(d){ return chart.xScale( d.xVal - 60 == 0 ? d.xVal : d.xVal - 60 ); })
		// 		//.each("end", function(){
		// 		//	d3.select(this).remove();

		// 		//})
		// 		.on("click", function(d) {
		// 			console.log("circle: ", d.xVal, ", ", d.yVal);
		// 		});
	}

})();
