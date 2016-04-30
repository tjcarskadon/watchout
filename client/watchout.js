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

//make our array of enemies
var enemyArmy = makeEnemies(1);

//function to update random enemy locations
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

var drag = d3.behavior.drag()
    // .origin(function(d) { return d; })
    .on('drag', dragged);

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x)
  .attr("cy", d.y = d3.event.y);
}


var player = svg.selectAll('.player')
  .data([{name: 'hiro ', x: svgWidth / 2, y: svgHeight / 2}])
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 100)
  .style('fill', 'purple')
  .call(drag);


var collide = function () {
  let enemies = svg.selectAll('.enemy').data();
  let player = svg.selectAll('.player').data();

d3.selectAll(".enemy").each( function(d, i){
    console.log( d3.select(this).attr("cx") );
})

  var pLeft = player[0].x - 100;
  var pTop = player[0].y - 100;
  var pRight = player[0].x + 100;
  var pBottom = player[0].y + 100;

  for (var i = 0; i < enemies.length; i++) {
    var eLeft = enemies[i].x - rad;
    var eTop = enemies[i].y - rad;
    var eRight = enemies[i].x + rad;
    var eBottom = enemies[i].y + rad;

    // if (pLeft > eRight || pTop < eBottom || pRight < eLeft || pBottom > eTop) {
    //   return true;
    // }

    if (pLeft < eRight && pRight > eLeft && pTop < eBottom && pBottom > eTop) {
        console.log("collision");
        return true;
    }


  }
  console.log(" not collision");
  return false;
};

setInterval(updateEnemies, 500);
setInterval(collide, 1);
