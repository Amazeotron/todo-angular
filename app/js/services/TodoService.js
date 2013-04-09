todo.services.factory('todoService', ['$rootScope', '$http', 'localStorageService', function ($rootScope, $http, localStorageService) {
  
  var todoService = {};
  
  todoService.message = {};
  todoService.todos = {};
  
  todoService.prepForBroadcast = function(msg) {
    this.message = msg;
    $rootScope.$broadcast('handleTodoBroadcast');
  }
  
  todoService.getTodos = function() {
    // localStorageService.clearAll();
    var todos = localStorageService.get('todos');
    var json = todos == null ? null : localStorageService.parseJson(todos);
    todoService.todos = json;
    console.log(todoService.todos);
    if (todoService.todos == null) {
      todoService.todos = {
        "todo": [{"title":"get er done!"}],
        "inprogress": [{"title": "It's gettin done..."}],
        "done": [{"title": "It get done!"}]
      }
      todoService.save();
    }
    
    // if(!$rootScope.$$phase) {
    //   $rootScope.$apply();
    // }
    
    $rootScope.$broadcast('todosRetrieved');
    
  }
  
  todoService.save = function() {
    // var val = {
    //       todo: todoService.todos.todo,
    //       inprogress: todoService.todos.inprogress,
    //       done: todoService.todos.done
    //     };
    // todoService.Lawnchair.save({
    //   key: 'todos',
    //   value: val
    // }, function() {
    //   console.log("Done saving locally!");
    // });
    var str = localStorageService.stringifyJson(todoService.todos);
    localStorageService.add('todos', str);
    console.log("Saved");
    console.log(localStorageService.parseJson(localStorageService.get('todos')));
  }
  
  return todoService;
  
}]);
todo.services.$inject = ['localStorageService'];