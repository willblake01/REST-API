const db = require ('../models');

module.exports = function (app) {

  app.get('/todos', function (req, res) {
    db.Todos.findAll({}).then(function (result) {
      res.json(result);
    }).then({
        function (result) {
          var newresult = JSON.parse(JSON.stringify(result));
          for (var i = 0; i < newresult.length; i++) {
            document.getElementById("todos").innerHTML += '<li>' + todos[i] + '</li>';
          }
        }
    });
  });

  // POST route for saving a new post
  app.post("/api/todos", function (req, res) {
    console.log(req.body);
    db.Todos.create({
        title: req.body.title
      })
      .then(function (dbtodos) {
        console.log(res.json(dbtodos));
      });
  });
};
