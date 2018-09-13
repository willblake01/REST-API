const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./models');

// Set up express app
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Access static directory
app.use(express.static(__dirname + '/public'));

// Set Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes =====================================================================
require('./routing/apiRoutes.js')(app);
require('./routing/viewRoutes.js')(app);

app.use(function (err, req, res, next) {
    if (err) {
        console.log(err.message);
        res.status('404').send(err);
    }
});

// Run server and sync database
db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log(`🌎 ==> Server now on port ${PORT}!`);
    });
});

module.exports = app;
