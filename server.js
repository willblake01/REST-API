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

// Set up Express app
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

// Implement request logger
app.use((request, response, next) => {
    console.log(new Date().toISOString(), request.method, request.originalUrl);
    return next();
})

// Routes =====================================================================
require('./routing/apiRoutes.js')(app);
require('./routing/viewRoutes.js')(app);

// Request error handling
app.use((request, response) => {
    console.warn(new Date().toISOString(), request.method, request.originalUrl, '404');
    return response.status(404).render('404', {
        title: '404',
    })
});

// Error handling
app.use((error, request, response, next) => {
    if (response.headersSent) {
        return next(error);
    }
    console.log(error);
    return response.status(500).render('500', {
        title: '500',
    });
});

// Run server and sync database
db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log(`🌎 ==> Server now on port ${PORT}!`);
    });
});

module.exports = app;
