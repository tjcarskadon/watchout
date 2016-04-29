// start slingin' some d3 here.
var svgHeight = 800;
let svgWidth = 800;

var svg = d3.select('body').append("svg")
  .attr('height', svgHeight)
  .attr('width', svgWidth);

// svg.append("circle")
//   .attr('r', 50)
//   .attr('cx', 400)
//   .attr('cy', 100);

var createCircleArray = function(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    let circle = {};
    circle.x = Math.random() * svgWidth;
    circle.y = Math.random() * svgHeight;
    result.push(circle);
  }
  return result;
};

var circleArray = createCircleArray(20);

svg.selectAll('circle')
  .data(circleArray)
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 20);
