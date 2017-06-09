var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var morgan = require('morgan');

mongoose.Promise = global.Promise;
var dbUrl = 'mongodb://localhost/test';

mongoose.connect(dbUrl);

var app = express();

if (app.get('env') === 'development') {
    app.set('showStackError', true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty = true; //html code style
    mongoose.set('debug', true);
}


// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
        secret: 'stuSelCourSys',
        store: new mongoStore({
            url: dbUrl,
            collection: 'session'
        }),
        resave: false,
        saveUninitialized: true
    }
));

//router control
var routers = require('./routes/routes');
routers(app);

//start listen
app.set('port', port);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


module.exports = app;

