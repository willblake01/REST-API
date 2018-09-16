const db = require ('../models');

module.exports = function (app) {

  // POST route for saving a new todo
  app.post('/api/new', function(req, res) {
    console.log(req.body);
    db.Todos.create({
        title: req.body.title
      })
    res.redirect('/');
  });

  // EDIT route for editing fields
  app.put('/api/edit/:id', function(req, res) {
    db.Todos.put({
      id: req.body.id
    })
    res.redirect('/');
  });

  // DELETE route for deleting a todo
  app.delete('/api/delete/:id', function(req, res) {
    db.Todos.delete({
      id: req.body.id
    })
    res.redirect('/');
  });
};
