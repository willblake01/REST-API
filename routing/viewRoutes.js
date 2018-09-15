const db = require("../models");

module.exports = function (app) {
  app.get("/test", function (req, res) {
    res.render("test", {
      javascript: "todoSubmit.js"
    });
  });

  //index route for landing page
  app.get("/", function (req, res) {
    db.Todos.findAll({}).then(function (result) {
      var items = [];
      for (var i = 0; i < result.length; i++) {
        items.push(result[i].dataValues)
      }
      res.render("index", {
        title: "To Dos",
        css: "index.css",
        javascript: "index.js",
        items: items
      });
    });
  });
}
