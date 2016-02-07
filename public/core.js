// Angular code for the app

var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};
    
  // when landing on page, get all todos and show them
  $http.get('/api/todos')
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
      
  // when submitting the add form, send the text to the Node API
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clear the form so user is ready to enter another
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
  
  // delete a todo after checking it off
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
  
}