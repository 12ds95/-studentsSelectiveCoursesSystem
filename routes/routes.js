/**
 * Created by CaiXin on 2017/5/23.
 */
var index = require('./index');
// var users = require('./users');
var login = require('./login');
var admin = require('./admin');
var applyforclass = require('./applyforclass');
var curriculum = require('./curriculum');
var student = require('./student');
var select = require('./select');
var teacher = require('./teacher');
var changepw = require('./changepw');
var personalinfo = require('./personalinfo');
var teacherManager = require('./teacherManager');
var studentManager = require('./studentManager');
var noticeManager = require('./noticeManager');
var captcha = require('./captcha');
// var byselection = require('./byselection');
var reselect = require('./reselect');
var publicKeyPem = require('../modules/crypto').publicKeyPem;
//var inforeport = require('./inforeport');
var stureportdl = require('./stureportdl');
var tchreport = require('./tchreport');
var tchreportdl = require('./tchreportdl');

module.exports = function(app) {
    app.locals.publicKey = publicKeyPem;
    app.locals.logStatus = false;
    app.locals.uID = "0000000000";
    app.use(function(req, res, next){
        if (!!req.session.loginUser) {
            app.locals.logStatus=true;
            app.locals.uID = req.session.loginUser;
        } else {
            app.locals.logStatus=false;
            app.locals.uID = "0000000000";
        }
        next();
    });

    app.use('/', index);
    // app.use('/users', users);
    app.use('/login', login);
    app.use('/admin', admin);
    app.use('/curriculum', curriculum);
    app.use('/student', student);
    app.use('/select', select);
    app.use('/teacher',teacher);
    app.use('/changepw',changepw);
    app.use('/personalinfo',personalinfo);
    app.use('/teacherManager',teacherManager);
    app.use('/studentManager', studentManager);
    app.use('/noticeManager', noticeManager);
    app.use('/captcha',captcha);
    // app.use('/byselection',byselection);
    //app.use('/applyforclass',applyforclass);
    app.use('/reselect',reselect);
    //app.use('/inforeport',inforeport);
    app.use('/stureportdl',stureportdl);
    app.use('/tchreport',tchreport);
    app.use('/tchreportdl',tchreportdl);

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
