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
    var oldpw = req.body.oldpw;
    var newpw = req.body.newpw;
    var confirmpw = req.body.confirmpw;
    console.log(oldpw, newpw, confirmpw);
    var data={
        status: 1
    };
    console.log(data);
    res.json(data);
});

router.post('/personalinfo',function (req,res,next) {
    res.render('personalinfo',{
        title : 'Personalinfo',
        studentID : '314010xxxx',
        studentName : 'xxx',
        address : '浙江大学玉泉校区',
        email : 'cailaoda@zju.edu.cn',
        phone : '178xxxxxxxx'
    });
});
module.exports = router;