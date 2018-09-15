const db = require ('../models');

module.exports = function (app) {

  // POST route for saving a new post
  app.post('/api/todos', function (req, res) {
    console.log(req.body);
    db.Todos.create({
        title: req.body.title
      })
    res.redirect('/');
  });
};
