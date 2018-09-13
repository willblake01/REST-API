var db = require("../models");

module.exports = function (app) {
  app.get("/test", function (req, res) {
    res.render("test", {
      javascript: "productSubmit.js"
    });
  });
  //index route for landing page
  app.get("/", function (req, res) {
    res.render("index", {
      title: "RangeFront",
      css: "index.css",
      javascript: "index.js",
      loggedIn: loggedInView(req)
    });
  });
}
