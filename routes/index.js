var express = require('express');
var User = require('../models/User');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index',{
        title : 'Login'
    });
    var uname = req.query.username;
    var passwd = req.query.password;

    User.getUserType(uname,function (err,usertype) {
        if (usertype == 2){
            console.log("This is a student!");
        }else if(usertype == 1){
            console.log("This is a teacher!");
        }
    });

});


router.post('/signin', function (req, res, next) {
    var username = req.body.user.name;
    var password = req.body.user.password;
    var code = parseInt(req.body.user.code);
    if (req.session.checkcode === code) {

    }
});

router.post('/news', function(req, res, next) {
    var pageNum = req.body['pageNum'];
    var itemPerPage = 20;
    var result = getNews(pageNum, pageNum*itemPerPage);
    res.json(result);
});
function getNews(from, to) {     // 取[from,to]的数据
    var result;
    var data = [
        {
            title: 'FFF团活动日',
            author: '计算机科学与技术学院',
            date: '5月20日',
            content: '5.20呵呵呵呵'
        },
        {
            title: '单身节',
            author: '计算机科学与技术学院',
            date: '11月11日',
            content: '单身狗的节日'
        }
    ];
    var head = ['title', 'author', 'date', 'content'];
    var pageTotal = 4;
    var title =  ['公告标题','发布单位','发布时间'];

    result = {
        'Title': title,
        'Head': head,
        'Content': data,
        'pageTotal': pageTotal
    };
    return result;
}

module.exports = router;
