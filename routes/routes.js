/**
 * Created by CaiXin on 2017/5/23.
 */
var index = require('./index');
var users = require('./users');
var login = require('./login');
var admin = require('./admin');

var curriculum = require('./curriculum')
var student = require('./student');
var select = require('./select');
var applyforclass = require('./applyforclass');
var changepw = require('./changepw');
var personalinfo = require('./personalinfo');

module.exports = function(app) {
    //user session
    app.use(function (req, res, next) {
         next();
    });

    app.use('/', index);
    app.use('/users', users);
    app.use('/login', login);
    app.use('/admin', admin);
    app.use('/curriculum', curriculum)
    app.use('/student', student);
    app.use('/select', select);
    app.use('/applyforclass',applyforclass);
    app.use('/changepw',changepw);
    app.use('/personalinfo',personalinfo);

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
