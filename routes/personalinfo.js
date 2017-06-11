/**
 * Created by iqich on 2017/5/30.
 */
var express = require('express');
var router = express.Router();

// router.use(function (req, res, next) {
//     if (!!req.session.loginUser) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('personalinfo',{
        title : 'Personalinfo',
        studentID : '314010xxxx',
        studentName : 'xxx'
    });
});

module.exports = router;