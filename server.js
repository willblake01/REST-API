const express = require('express');
const morgan = require('morgan');
const winston = require('winston'); // for transports.Console
const expressWinston = require('express-winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const https = require('https');
const logger = require('./log/lib/logger.js');
const requestLogger = require('./log/lib/requestLogger.js');

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./models');

// Set up body parser from documentation
app.use(cookieParser()); // read cookies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Implement Morgan request logger
app.use(requestLogger);

// Access static directory
app.use(express.static(__dirname + '/public'));

// Set Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// express-winston logger BEFORE the router
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            timestamp: new Date().toISOString(),
            colorize: true
        })
    ]
}));

// Routes =====================================================================
require('./routing/apiRoutes.js')(app);
require('./routing/viewRoutes.js')(app);

// express-winston errorLogger makes sense AFTER the router.
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}));

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
    app.listen(PORT, () => {
        console.log(`🌎 ==> Server now on port ${PORT}!`);
    })
    .on('listening', () => logger.info(PORT, 'HTTP server listening on port ${PORT}!'));
});

module.exports = app;
