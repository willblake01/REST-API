const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;

const app = express();

const db = require('./models');

// Set up express app
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes =====================================================================
require('./routing/apiRoutes.js')(app);

var todos = [];

app.get('/todos', function (req, res) {
    res.json(todos);
});

app.post('/todos', function (req, res) {
    var todo = req.body.todo;
});

res.send(todo);

// Run server and sync database
db.sequelize.sync({
    force: true
}).then(function () {
    app.listen(PORT, function () {
        console.log(`🌎 ==> Server now on port ${PORT}!`);
    });
});
