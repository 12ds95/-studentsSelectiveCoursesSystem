var express = require('express');
var router = express.Router();
var News = require('../models/News')
    , assert = require('assert')
    ;

// router.use(function (req, res, next) {
//     if (!!req.session.loginUser && !!req.session.userType) {
//         if (req.session.userType === "admin") {
//             next();
//         } else {
//             res.redirect('/');
//         }
//     } else {
//         res.redirect('/');
//     }
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    // 左侧固定参数
    var leftTitle = '信息与动态';
    var leftImage = 'images/people_default.png';
    var leftText = {
        '工号': '2333',
        '院系': '妓院妓院妓院'
    };
    // 右侧筛选器固定参数
    var filterNameData = [
        '课程名称',
        '课程代码',
        '教师名字',
        '课程类别'
    ];
    var filterOpData = [
        '包含',
        '不包含',
        '等于',
        '不等于'
    ];
    // 渲染
    res.render('noticeManager',{
        title: '公告信息管理页',
        leftTitle: leftTitle,
        leftImage: leftImage,
        leftText: leftText,
        filterNameData: filterNameData,
        filterOpData: filterOpData
    });
});

router.post('/tableData', function(req, res, next) {
    var pageNum = req.body['pageNum'];
    var pageSize = 20;
    News.getNumberOfPages(pageSize,function(totalPages){
        News.getAPage(pageNum,pageSize,function(pageResult){
            var result = {
                'Data': pageResult,
                'TotalItem':pageResult.length
            }
            var jsonn = {};
            jsonn['PageTotal'] = totalPages;
            jsonn['Title'] = ['发布时间','发布单位','通知标题'];
            jsonn['Content'] = [];
            for (var i=0; i<result['Data'].length; i++) {
                jsonn['Content'].push({
                    '发布时间': result['Data'][i]['createAt'],
                    '发布单位': result['Data'][i]['department'],
                    '通知标题': result['Data'][i]['title']
                });
            }
            res.json(jsonn);
        })
    })
    //var result = getNoticeData((pageNum-1)*itemPerPage+1, pageNum*itemPerPage);
    //res.json(result);
});

// 以下的函数暂时失效，不进行调用
// function getNoticeData(from, to) {
//     // 以下是后端数据库的函数：读取20条通知信息（不到20则以实际为准），返回通知总数
//     // 返回值：result包，包括TotalItem标签的全部通知总数，和Data标签的[from,to]区间的通知发布时间、发布单位、公告标题
//     // result = get20Data(...)
//     var result = {      // 这个是伪造数据，应删除（返回格式应与此一致）
//         'Data': [
//             {createAt:'2017-03-30', department:'本科生院', title:'标题1'},
//             {createAt:'2017-03-23', department:'学工部', title:'标题2'}
//         ],
//         'TotalItem': 2
//     };
//     // 以上
//     var jsonn = {};
//     jsonn['PageTotal'] = parseInt((result['TotalItem']-1) / 20 + 1);
//     jsonn['Title'] = ['发布时间','发布单位','通知标题'];
//     jsonn['Content'] = [];
//     for (var i=0; i<result['Data'].length; i++) {
//         jsonn['Content'].push({
//             '发布时间': result['Data'][i]['createAt'],
//             '发布单位': result['Data'][i]['department'],
//             '通知标题': result['Data'][i]['title']
//         });
//     }
//     return jsonn;
// }

router.post('/getData', function (req, res, next) {
    // change the following ID to title
    var title = req.body['通知编号'];
    // 以下是后端数据库的函数：查找通知
    // 返回值：result包，包括该通知的所有信息
    // result = addData(...)
    // 以上
    News.findOne({title:title},function(err,news){
        assert.equal(null,err);
        var jsonn = {};
        jsonn['通知编号'] = news._id;
        jsonn['发布时间'] = news.createAt;
        jsonn['发布单位'] = news.department;
        jsonn['通知标题'] = news.title;
        jsonn['通知内容'] = news.content;
        res.json(jsonn);
    });
});

router.post('/addData', function(req, res, next) {

    // 以下是后端数据库的函数：添加通知
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = addData(...)
    // 以上
    var _news = new News({
        content: req.body['通知内容']
        , title: req.body['通知标题']
        , department: req.body['发布单位']
    });
    _news.save(function(err,saveRes){
        // assert.equal(null,err); // Maybe no need to assert
        var status;
        if (err) { status = -1; }
        else { status = 0 ;}
        var jsonn = {};
        jsonn['status'] = status;
        jsonn['errMsg'] = err;
        res.json(jsonn);
    });
});

router.post('/modifyData', function(req, res, next) {
    var id = req.body['通知编号'];
    var department = req.body['发布单位'];
    var title = req.body['通知标题'];
    var content = req.body['通知内容'];
    // 以下是后端数据库的函数：修改通知
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    News.findOne({id:ID},function(err,news){
        news.title = title;
        news.department = department;
        news.content = content;

        news.save(function(err,save_res){
            assert.equal(err,null);
            console.log('News info update success!');
            var status,errmsg;
            if(err) { status = 1; errmsg = err;}
            else { status = 0; errmsg = null;}
                var jsonn = {};
                jsonn['status'] = status;
                jsonn['errMsg'] = errmsg;
                // return until update finish
                res.json(jsonn);
        }); 
    });
});

router.post('/deleteData', function(req, res, next) {
    var title = req.body['通知编号'];
    // 以下是后端数据库的函数：删除通知
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    News.findOneAndRemove({title:title},function(err){
        assert.equal(err,null);
        var jsonn;
        if (err){jsonn['status'] = 1; jsonn['errMsg'] = err ;}
        else { jsonn['status'] = 0;jsonn['errMsg'] = null;}
        res.json(jsonn);
    });
});

module.exports = router;
