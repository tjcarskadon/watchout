// start slingin' some d3 here.
var svgHeight = 800;
let svgWidth = 800;
let rad = 20;

var svg = d3.select('body').append('svg')
  .attr('height', svgHeight)
  .attr('width', svgWidth);


var makeEnemies = function(n) {

  let result = [];
  for (let i = 0; i < n; i++) {
    let enemy = {};
    enemy.name = i;
    result.push(enemy);
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

var enemyArmy = makeEnemies(20);

var updateEnemies = function () {
  setPositions(enemyArmy);
  var enemies = svg.selectAll('.enemy')
      .data(enemyArmy, function (d) { return d.name; });
    

  enemies.transition()
    .duration(1000)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
  
  
  enemies.enter()
    .append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', rad);
};


var player = svg.selectAll('.player')
  .data([{name: 'hiro '}])
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr('cx', svgWidth / 2)
  .attr('cy', svgHeight / 2)
  .attr('r', rad)
  .style('fill', 'purple');

setInterval(updateEnemies, 1000);
