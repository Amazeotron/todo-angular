todo-angular
============

This is a todo app built in AngularJS. It uses Lawnchair for local storage, Angular UI for drag and drop resorting, and SASS.

Check out the [working example](http://lab-todo.friendlyweekdaycrowd.com/ "A working example of a todo app").

Features:
* Drag and Drop reordering
* Items in Todo can't be dragged to done, but items in In Progress can be. Items in In Progress and Done can be dragged anywhere.
* Counts in the column headers are automatically updated as the items change.
* Add new Todos with the "add" button.
* Keyboard esc key closes the Add overlay.
* You can edit the Todo title directly in the Todo. It updates the model as you type.
* Todos are saved between browser refreshes with LocalStorage and Lawnchair.