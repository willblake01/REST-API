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

  // GET delete record form
  app.get('/api/delete/:id', function(req, res) {
    res.render("delete", {
          title: "Delete Form",
          css: "delete.css",
          javascript: "delete.js"
    });
  });

  // DELETE route for deleting a todo
  app.delete('/api/destroy/:id', function(req, res) {
    db.Todos.destroy({
      where: {
        id: req.body.id
      }
    })
    res.redirect('/');
  });
};
