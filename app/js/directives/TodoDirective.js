todo.directives.directive('todoDirective', function factory($compile, todoService) {
  var _overlay = null;
  
  function disableDoneElements(event, ui) {
    $('#js-done-list').children().each(function(index, element) {
      $(element).addClass('disabled');
    });
  }
  
  function disableDragFromTodo(event, ui) {
    $('#js-todo-list').sortable('cancel');
  }
  
  function doneSorting() {
    $('#js-done-list').children().each(function(index, element) {
      $(element).removeClass('disabled');
    });
    $('#js-done-list').sortable('option', 'disabled', false);
  }
  
  function removeOverlay() {
    _overlay.empty();
    $(document).off('keyup');
  }
  
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var elem = $(element);
      _overlay = $('#js-overlay-container');
      
      $('#js-add-todo-button').on('click', function(event) {
        event.preventDefault();
        // Make the Add Todo overlay
        $.get('partials/add.html', function(data, textStatus, jqXHR) {
          _overlay.html($compile(data)(scope));
        });
      });
      
      scope.$on('handleTodoBroadcast', function() {
        
        switch (todoService.message.title) {
          case 'removeOverlay':
          removeOverlay();
          break;
          
          case 'addNewTodo':
          removeOverlay();
          scope.addNewTodo(todoService.message.data);
          $('.todo-list').sortable('refresh');
          break;
          
          case 'disableDoneElements':
          disableDoneElements(todoService.message.event, todoService.message.ui);
          break;
          
          case 'disableDragFromTodo':
          disableDragFromTodo(todoService.message.event, todoService.message.ui);
          break;
          
          case 'doneSorting':
          doneSorting();
          break;
        }
      });
    }
  }
});

todo.directives.directive('todoAddTodo', function factory(todoService) {
  
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      
      $('#js-add-todo-title').focus();
      
      $(document).on('keyup', function(event) {
        switch (event.keyCode) {
          case 27:
          todoService.prepForBroadcast({title:'removeOverlay'});
          break;
          
          // case 13:
          // todoService.prepForBroadcast({title:'addNewTodo', data: scope.todoTitle});
          // scope.$apply();
          // break;
        }
      });
      
      scope.addTodoForm.$valid = false;
      
      var elem = $(element);
      
      scope.$on('handleTodoBroadcast', function() {
        
      });
      
    }
  }
});