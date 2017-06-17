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
    // 以下是后端数据库的函数：查找学生
    // 返回值：result包，包括该学生的所有信息
    // result = getData(...)
    var result = {
        name: '张三',
        id: '3140102345',
        ismale: true,
        credit: 130,
        department: '计算机学院'
    };
    // 以上为伪造数据，需要替换掉
    var leftColAttr = {};
    leftColAttr['姓名'] = result['name'];
    leftColAttr['照片'] = "images/photo_student.png";
    leftColAttr['学号'] = result['id'];
    leftColAttr['性别'] = result['ismale'] === true ? '男': '女';
    leftColAttr['学分'] = result['credit'];
    leftColAttr['院系'] = result['department'];
    var rightColAttr = [{
            'imgURL':'images/student_select.png',
            'URL':'/select',
            '名称':'选课'
        },{
            'imgURL':'images/student_table.png',
            'URL':'/curriculum',
            '名称':'查看课表'
        },{
            'imgURL':'images/student_reselect.png',
            'URL':'/reselect',
            '名称':'补选'
        }
    ];
    res.render('mainPage',{
        title: '学生主页',
        leftColAttr: leftColAttr,
        rightColAttr: rightColAttr
    });
});

module.exports = router;
