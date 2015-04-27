function log(input) {

  console.log('working', input)
};

var nbaApp = angular.module('nbaApp', []);

nbaApp.controller('mainController', function($scope, $http) {
  $scope.data = {};

  $scope.test = "blehh"

  $scope.items = [
    { category: 'points_per_game', name: 'Points per game' },
    { category: 'assists_per_game', name: 'Assists per game' },
    { category: 'rebounds_per_game', name: 'Rebounds per game' },
    { category: 'off_rebounds_per_game', name: 'Offensive rebounds per game' },
    { category: 'def_rebounds_per_game', name: 'Defensive rebounds per game' },
    { category: 'blocks_per_game', name: 'Blocks per game'  },
    { category: 'steals_per_game', name: 'Steals per game'  },
    { category: 'minutes_per_game', name: 'Minutes per game'  },
    { category: 'assists_to_turnovers_per_game', name: 'Assists to turnovers per game'  },
    { category: 'steals_to_turnovers_per_game', name: 'Steals to turnovers per game'  },
    { category: 'field_goal_pct', name: 'Field goal percentage' },
    { category: 'free_throw_pct', name: 'Free throw percentage'  },
    { category: 'three_point_pct', name: 'Three point percentage'  }
  ];

  $scope.getLeaders = function() {

    $http.get('/' + $scope.selection.category)
      .success(function(data) {
          $scope.data = data;
          console.log(data);
          $scope.$apply();
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
  };

});

nbaApp.directive('barGraph', function($timeout, $window) {
  var link = function(scope, element, attr) {

    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text("a simple tooltip");


    var svg = d3.select(element[0])
      .append('svg')
      .style('width', '100%');

      window.onresize = function() {
        scope.$apply();
      };
      
      var margin = 20;
      var barHeight = 20;
      var barPadding = 5;

      // scope.$watch(function() {
      //     return angular.element($window)[0].innerWidth;
      //   }, function() {
      //     scope.render(scope.data);
      //   });

      scope.render = function(data) {
     
        svg.selectAll('*').remove();

        if (!data) return;

        $timeout(function() {
          var width = d3.select(element[0])[0][0].offsetWidth - margin;
          var height = scope.data.length * (barHeight + barPadding);
          var color = d3.scale.category20();
          var xScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) {
              return d.value;
            })])
            .range([0, width]);

          svg.attr('height', height);

          svg.selectAll('rect')
            .data(data)
            .enter()
              .append('rect')
              .attr('height', barHeight)
              .attr('width', 140)
              .attr('x', Math.round(margin/2))
              .attr('y', function(d,i) {
                return i * (barHeight + barPadding);
              })
              .attr('fill', function(d) {
               return color(d.value);
              })
              .transition()
              .duration(1000)
              .attr('width', function(d) {
                return xScale(d.value);
              })
              
           svg.selectAll('text')
             .data(data)
             .enter()
              .append('text')
              .attr('fill', '#fff')
              .attr('y', function(d,i) {
                return i * (barHeight + barPadding) + 15;
              })
              .attr('x', 15)
              .text(function(d) {
                return d.display_name + " (" + d.value + ")";
              })
              .on("mouseover", function(d){return tooltip.style("visibility", "visible")
                .html('<div>' + d.display_name + '</div>'
                  + '<div>Rank: ' + d.rank + '</div>'
                  + '<div>Team: ' + d.team.full_name + '</div>'
                );})
              .on("mousemove", function(){return tooltip.style("top",
                  (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+100)+"px");})
              .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
              // .on('mouseover', function(d, i) {
              //   return "log(" + i + ")"
              // });
              // .attr("onmouseover", function(d, i) {

              


                // return "log(" + i + ")"
             
              // .attr("onmouseexit", function(d, i) {
              //   return "log(" + i + ")"
              // });

        }, 200);
      };

      scope.$watch('data', function(newData) {
        return scope.render(newData);
      }, true);  
  };
    
  return {
    link: link,
    scope: { data: '=' },
    restrict: 'EA'
  }
});





