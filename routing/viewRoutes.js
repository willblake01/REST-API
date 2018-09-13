const db = require("../models");

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

  // res.send(todo);
}
