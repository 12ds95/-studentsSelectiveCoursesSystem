var express = require('express');
var router = express.Router();
var privateKey = require('../modules/crypto').privateKey;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{
        title : '选课管理系统'
    });
});

router.get('/signout', function(req, res) {
    delete req.session.loginUser;
    delete req.session.userType;
    req.session.loginUser = null;
    req.session.userType = null;
    res.redirect('/');
});


var User = require('../models/User.js');
router.post('/signin', function (req, res, next) {
    var username = req.body.user.name;
    var password = privateKey.decrypt(req.body.user.password, 'utf8');
    var code = parseInt(req.body.user.code);
    if (req.session.checkcode === code) {
        User.findOne({name: username},function(err,user){
            if (err) {
                console.log(err)
            }
            if (!user) {
                return res.redirect('/')
            }
            user.comparePassword(password,function(err,isMatch){
                if (err) {
                    console.log(err)
                }
                if (isMatch) {
                    req.session.loginUser = username;
                    req.session.userType = "student";
                    console.log('matched');
                    return res.redirect('/student');
                }else{
                    console.log('Password is not matched');
                    return res.redirect('/');
                }
            })
        });
    } else {
        return res.redirect('/');
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
            department: '计算机科学与技术学院',
            createAt: '5月20日',
            content: '5.20呵呵呵呵'
        },
        {
            title: '单身节',
            department: '计算机科学与技术学院',
            createAt: '11月11日',
            content: '单身狗的节日'
        }
    ];
    var head = ['title', 'department', 'createAt', 'content'];
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
