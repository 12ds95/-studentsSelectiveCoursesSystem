/**
 * Created by iqich on 2017/6/8.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('byselection',{
        title : '申请补选',
        classname : 'xxx',
        classnumber :'0000211',
        teacher : 'xxx',
        classtime : '周一34',
        department : '计算机学院',
        classhours : '0-3',
        credit : '1',
        campus : '玉泉',
        stuname : 'xxx',
        stunumber : '314010xxxx',
        studepartment : '计算机学院'
    });
});

module.exports = router;