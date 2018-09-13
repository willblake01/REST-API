var db = require ('../models');

module.exports = function (app) {

  app.get('/todos', function (req, res) {
    res.json(todos);
  });

  app.post('/todos', function (req, res) {
    var todo = req.body.todo;
  });

  res.send(todo);
  }

  // app.get("/api/products", function (req, res) {
  //   db.Products.findAll({}).then(function (result) {
  //     res.json(result);
  //   });
  // });
};
