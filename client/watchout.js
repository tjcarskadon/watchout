// start slingin' some d3 here.
var svgHeight = 800;
let svgWidth = 800;
let rad = 20;

var svg = d3.select('body').append('svg')
  .attr('height', svgHeight)
  .attr('width', svgWidth);

// svg.append("circle")
//   .attr('r', 50)
//   .attr('cx', 400)
//   .attr('cy', 100);


var makeCircles = function(n) {

  let result = [];
  for (let i = 0; i < n; i++) {
    let circle = {};
    circle.name = i;
    result.push(circle);
  }
  return result;

};

//takes an array of objects and returns an array of objects with updated x and y coordinates
var setPositions = function(array) {  

  for (let i = 0; i < array.length; i++) {
    array[i].x = Math.random() * (svgWidth - (rad + rad)) + rad;
    array[i].y = Math.random() * (svgHeight - (rad + rad)) + rad;
  }
};

var circleArray = makeCircles(20);

var updateCircles = function () {
  setPositions(circleArray);
  var circles = svg.selectAll('circle')
      .data(circleArray, function (d) { return d.name; });
    

  circles.transition()
    .duration(1000)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
  
  
  circles.enter()
    .append('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', rad);
};

setInterval(updateCircles, 1000);
