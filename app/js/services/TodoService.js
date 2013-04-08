todo.services.factory('todoService', ['$rootScope', '$http', function ($rootScope, $http) {
  
  var todoService = {};
  
  todoService.message = {};
  todoService.Lawnchair = null;
  todoService.todos = {};
  
  todoService.prepForBroadcast = function(msg) {
    this.message = msg;
    $rootScope.$broadcast('handleTodoBroadcast');
  }
  
  todoService.getTodos = function() {
    
    if (todoService.Lawnchair == null) {
      todoService.Lawnchair = new Lawnchair({name: 'todos', record: 'todo'}, function(people) {
        console.log("Lawnchair has been initiated.");
      });
    }
    
    todoService.Lawnchair.get('todos', function(todos) {
      
      if (typeof todos == 'undefined') {
        todoService.todos = {
          "todo": [
            {"title": "Wash car"},
            {"title": "Make dinner"}
          ],
          "inprogress": [{"title": "do something"}],
          "done": [{"title": "eat lunch"}]
        };
      } else {
        todoService.todos = todos;
      }
      
      $rootScope.$broadcast('todosRetrieved');
    });
  }
  
  todoService.save = function() {
    var todo = todoService.todos.todo,
        inprogress = todoService.todos.inprogress,
        done = todoService.todos.done;
    todoService.Lawnchair.save({
      key: 'todos',
      todo: todo,
      inprogress: inprogress,
      done: done
    }, function() {
      console.log("Done saving locally!");
    });
  }
  
  return todoService;
  
}]);