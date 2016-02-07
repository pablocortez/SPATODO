/*
In this file:

1. Configure app
2. Connect to the database
3. Create Mongoose models (what is this?)
4. Define routes for RESTful API
5. Define routes for frontend Angular app
6. Set the app to listen to a port


*/

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// configuration

mongoose.connect('mongodb://<user>:<pass>@apollo.modulusmongo.net:27017/ah4omIxo'); 

app.use(express.static(__dirname + '/public'));         // set static files
app.use(morgan('dev'));                                 // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                             // parse application/json
app.use(bodyParser.json({type: 
    'application/vnd.api+json'  
}));                                                    // parse application/vnd.api+json as json
app.use(methodOverride());

// define model ===============
var Todo = mongoose.model('Todo', {
  text : String
});

// routes =====================

  // api ------
  
  app.get('/', function(req, res) {
      res.sendfile('./public/index.html'); 
  });
  
  // get all todos
  app.get('/api/todos', function(req, res) {
    
    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {
      
      if (err) 
        res.send(err)
        
      res.json(todos); // return all todos in JSON format
      
    });
  });
  
  // create todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {
    
    // create todo, information comes from Angular AJAX request
    Todo.create({
      text : req.body.text,
      done : false
    }, function(err, todo) {
      if(err)
        res.send(err)
        
      // get and return all todos after another is created
      
      Todo.find(function(err, todos) {
        if (err)
          send(err)
        res.json(todos);
      });
    });
    
  });
  // end create
  
  // delete a todo
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, res) {
      if (err)
        res.send(err);
        
      // get and return all todos after another is created
      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
    
  });
  // end delete


// listen 
app.listen(process.env.PORT);
console.log('Listening...');
