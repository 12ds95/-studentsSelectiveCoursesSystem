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
    res.render('changepw',{
        title : "change password"
    });
});

router.post('/pw/change', function(req, res, next) {
    console.log(req.body);
    var data={
        status: 1
    };
    console.log(data);
    res.json(data);
});

module.exports = router;