todo.controllers.controller('todoAddController', function ($scope, $http, $location, todoService) {
  
  $scope.todoService = todoService;
  $scope.todoTitle = '';
  
  $scope.removeOverlay = function(event) {
    event.preventDefault();
    todoService.prepForBroadcast({title:'removeOverlay'});
  }
  
  $scope.addNewTodo = function(event) {
    event.preventDefault();
    if ($scope.todoTitle != '') {
      todoService.prepForBroadcast({title:'addNewTodo', data: $scope.todoTitle});
    }
    
  }
  
});