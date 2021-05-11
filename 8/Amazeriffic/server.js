const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect('mongodb://localhost/amazeriffic',  { useNewUrlParser: true });
const port = 3000;
var bodyParser = require('body-parser');

const usersController = require("./userController.js");
const toDosController = require("./todoController.js");

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({    
  extended: true
}));

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

app.use(express.static(__dirname + "/client"));
app.use('/users/:username',express.static(__dirname + "/client"));

app.get("/toDosTags.json", toDosController.index);
app.post("/todos", toDosController.create);
app.put("/todos/:id", toDosController.update);
app.delete("/todos/:id", toDosController.remove);

app.get("/users/admin/users.json", usersController.index);
app.post("/users",usersController.create);
app.post("/login",usersController.login);
app.post("/registration",usersController.registration);
app.put("/users/admin/:id", usersController.update);
app.delete("/users/admin/:id", usersController.remove);

app.get("/users/:username/toDosTags.json", toDosController.index);
app.get("/users/:username/notes.html", toDosController.index);
app.post("/users/:username/toDosTags", toDosController.create);
app.put("/users/:username/todos/:id", toDosController.update);
app.delete("/users/:username/todos/:id", toDosController.remove);