var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(function (req, res, next) {
    if (!!req.session.loginUser && !!req.session.userType) {
        if (req.session.userType === "student") {
            next();
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/', function(req, res, next) {
    var leftColAttr = {
        '姓名':'蔡老板',
        '照片':'images/people_default.png',
        '学号':'3140102333',
        '院系':'妓院',
        '专业':'程序猿',
        '行政班':'码农一班'
    };
    var rightColAttr = [{
            'imgURL':'images/select.png',
            'URL':'http://www.baidu.com',
            '名称':'选课'
        },{
            'imgURL':'images/table.png',
            'URL':'http://www.baidu.com',
            '名称':'查看课表'
        },{
            'imgURL':'images/rechoose.png',
            'URL':'http://www.baidu.com',
            '名称':'补选'
        }
    ];
    res.render('student',{
        title: '学生主页',
        leftColAttr: leftColAttr,
        rightColAttr: rightColAttr
    });
});

module.exports = router;
