/**
 * Created by CaiXin on 2017/5/23.
 */
var index = require('./index');
var users = require('./users');
var login = require('./login');
var admin = require('./admin');

module.exports = function(app) {
    app.use('/', index);
    app.use('/users', users);
    app.use('/login', login);
    app.use('/admin', admin);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};