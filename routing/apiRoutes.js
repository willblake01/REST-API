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

  // GET edit record form
  app.get('/api/:id/edit', function (req, res) {
    res.render("edit", {
      title: "Edit Form",
      css: "edit.css",
      javascript: "edit.js"
    });
  });

  // EDIT route for editing fields
  app.patch('/api/:id', function(req, res) {
    db.Todos.update({
      title: req.body.title
    })
    res.redirect('/');
  });

  // GET delete record form
  app.get('/api/:id/delete', function(req, res) {
    res.render("delete", {
          title: "Delete Form",
          css: "delete.css",
          javascript: "delete.js"
    });
  });

  // DELETE route for deleting a todo
  app.delete('/api/:id', function(req, res) {
    db.Todos.destroy({
      where: {
        id: req.body.id
      }
    })
    res.redirect('/');
  });
};
