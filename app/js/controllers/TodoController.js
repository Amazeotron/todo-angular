todo.controllers.controller('todoController', function ($scope, $http, $location, $compile, todoService) {
  
  $scope.TodoService = todoService;
  
  $scope.$on('todosRetrieved', function() {
    
  });
  
  $scope.TodoService.getTodos();
  
  $scope.todoChange = function(item, category) {
    
    if (typeof item.title == "undefined") {
      $scope.removeTodo(item, category);
    } else {
      $scope.TodoService.save();
    }
  }
  
  $scope.removeTodo = function(item, category) {
    
    switch (category) {
      case "todo":
      var index = $scope.TodoService.todos.todo.indexOf(item);
      if (index != -1) {
        $scope.TodoService.todos.todo.splice(index, 1);
      }
      break;
      
      case "inprogress":
      var index = $scope.TodoService.todos.inprogress.indexOf(item);
      if (index != -1) {
        $scope.TodoService.todos.inprogress.splice(index, 1);
      }
      break;
      
      case "done":
      var index = $scope.TodoService.todos.done.indexOf(item);
      if (index != -1) {
        $scope.TodoService.todos.done.splice(index, 1);
      }
      break;
    }
    $scope.TodoService.save();
  }
  
  $scope.numTodos = function() {
    return $scope.TodoService.todos.todo.length + $scope.TodoService.todos.inprogress.length + $scope.TodoService.todos.done.length;
  }
  
  $scope.addNewTodo = function(title) {
    $scope.TodoService.todos.todo.unshift({"title":title});
    $scope.TodoService.save();
  }
  
  $scope.start = function(event, ui) {
    // Check which one is being dragged, and where it can go.
    // if it's a todo, it can't go in the Done category. 
    // All others can go where they want.
    var todoState = ui.item.data("todo-state");
    if (todoState == "todo") {
      $scope.TodoService.prepForBroadcast({title:"disableDoneElements", event:event, ui:ui});
    }
  }
  
  $scope.beforeStop = function(event, ui) {
    var todoState = ui.item.data("todo-state");
    var itemParent = ui.item.parent().attr("id");
    if (todoState == "todo" && itemParent == "js-done-list") {
      $scope.TodoService.prepForBroadcast({title:"disableDragFromTodo", event:event, ui:ui});
    }
    
    $scope.TodoService.prepForBroadcast({title:"doneSorting", event:event, ui:ui});
  }
  
  $scope.stop = function(event, ui) {
    $scope.TodoService.save();
  }
  
  $scope.getOrder = function() {
    return 1;
  }
  
});