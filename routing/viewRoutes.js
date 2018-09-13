var db = require("../models");
var todos = [];

module.exports = function (app) {
  app.get("/test", function (req, res) {
    res.render("test", {
      javascript: "todoSubmit.js"
    });
  });

  //index route for landing page
  app.get("/", function (req, res) {
    res.render("index", {
      title: "To Dos",
      css: "index.css",
      javascript: "index.js"
    });
  });

  app.get('/todos', function (req, res) {
    res.json(todos);
  });

  app.post('/todos', function (req, res) {
    var todo = req.body.todo;
  });

  // res.send(todo);
}
