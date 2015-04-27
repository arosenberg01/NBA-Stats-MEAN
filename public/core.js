
var nbaApp = angular.module('nbaApp', []);

var mainController = function($scope, $http) {
  $scope.data = {};
  
  $scope.items = [
    { category: 'points_per_game', name: 'Points per game' },
    { category: 'assists_per_game', name: 'Assists per game' },
    { category: 'rebounds_per_game', name: 'Rebounds per game' },
    { category: 'off_rebounds_per_game', name: 'Offensive rebounds per game' },
    { category: 'def_rebounds_per_game', name: 'Defensive rebounds per game' },
    { category: 'blocks_per_game', name: 'Blocks per game'  },
    { category: 'steals_per_game', name: 'Steals per game'  },
    { category: 'minutes_per_game', name: 'Minutes per game'  },
    { category: 'assists_to_turnovers_per_game', name: 'Assits to turnovers per game'  },
    { category: 'steals_to_turnovers_per_game', name: 'Steals to turnovers per game'  },
    { category: 'field_goal_pct', name: 'Field goal percentage' },
    { category: 'free_throw_pct', name: 'Free throw percentage'  },
    { category: 'three_point_pct', name: 'Three point percentage'  }
  ];

  $scope.getLeaders = function(category) {
    console.log($scope.selection.category);

    $http.get('/' + $scope.selection.category)
      .success(function(data) {
          $scope.data = data;
          console.log(data[0].display_name);
          // console.log(data);
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
  }
};

nbaApp.directive('helloWorld', function() {
  var link = function(scope, element, attr) {
    element.text('Hello World!');
    var svg = d3.select(element[0])
      .append('svg')
      .style('width', '100%');

      // window.onresize = function() {
      //   scope.$apply();
      // };
      
      var margin = 20;
      var barHeight = 20;
      var barPadding = 5;
      
      scope.data = [
        {name: "Greg", score: 98},
        {name: "Ari", score: 96},
        {name: 'Q', score: 75},
        {name: "Loser", score: 48}
      ];

      // scope.$watch(function() {
      //     return angular.element($window)[0].innerWidth;
      //   }, function() {
      //     scope.render(scope.data);
      //   });

      scope.render = function(data) {
     
        svg.selectAll('*').remove();

        if (!data) return;
        // if (renderTimeout) clearTimeout(renderTimeout);

        // renderTimeout = $timeout(function() {
          var width = d3.select(element[0])[0][0].offsetWidth - margin,
            height = scope.data.length * (barHeight + barPadding),
            color = d3.scale.category20(),
            xScale = d3.scale.linear()
              .domain([0, d3.max(data, function(d) {
                return d.score;
              })])
              .range([0, width]);

        svg.attr('height', height);

        svg.selectAll('rect')
          .data(data)
          .enter()
            .append('rect')
            .on('click', function(d,i) {
              return scope.onClick({item: d});
            })
            .attr('height', barHeight)
            .attr('width', 140)
            .attr('x', Math.round(margin/2))
            .attr('y', function(d,i) {
              return i * (barHeight + barPadding);
            })
            .attr('fill', function(d) {
             return color(d.score);
            })
            .transition()
            .duration(1000)
            .attr('width', function(d) {
              return xScale(d.score);
            });
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
              return d.name + " (scored: " + d.score + ")";
            });
        // }, 200);
      };

      scope.render(scope.data);


  };
    
  return {
    link: link,
    scope: {},
    restrict: 'EA'
  }
});





