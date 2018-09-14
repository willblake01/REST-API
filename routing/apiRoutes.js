const db = require ('../models');

module.exports = function (app) {

  app.get('/todos', function (req, res) {
    res.json(todos);
  });

  // POST route for saving a new post
  app.post("/api/todos", function (req, res) {
    console.log(req.body);
    db.Todos.create({
        title: req.body.title,
        inProgress: req.body
      })
      .then(function (dbTodo) {
        res.json(dbTodo);
      });
  });
};
