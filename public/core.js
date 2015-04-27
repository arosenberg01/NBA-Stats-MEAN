
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
    { category: 'field_goal_pct', name: 'Field goal percentage' },
    { category: 'free_throw_pct', name: 'Free throw percentage'  },
    { category: 'three_point_pct', name: 'Three point percentage'  },
    { category: 'steals_to_turnovers_per_game', name: 'Steals to turnovers per game'  },
  ];

  $scope.getLeaders = function(category) {
    console.log($scope.selection.category);

    $http.get('/' + $scope.selection.category)
      .success(function(data) {
          $scope.data = data;
          console.log(data[0].display_name);
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
    
  }

};