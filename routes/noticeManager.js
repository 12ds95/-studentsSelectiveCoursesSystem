var express = require('express');
var router = express.Router();

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
    var leftImage = 'images/photo_admin.png';
    var leftText = {
        '工号': '2333',
        '院系': '妓院妓院妓院'
    };
    // 右侧筛选器固定参数
    var filterNameData = [
        ['发布时间', 'createAt'],
        ['发布单位', 'departement'],
        ['通知标题', 'title']
    ];
    var filterOpData = [
        ['等于', 'equal'],
        ['不等于', 'not_equal'],
        ['包含', 'include'],
        ['不包含', 'not_include'],
        ['大于', 'greater_than'],
        ['小于', 'less_than']
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
    var query = req.body['query'];
    var itemPerPage = 20;
    var result = getNoticeData(query, (pageNum-1)*itemPerPage+1, pageNum*itemPerPage);
    res.json(result);
});
function getNoticeData(query, from, to) {
    console.log(query);
    // 以下是后端数据库的函数：根据query（如果为null则读取全部），读取20条通知信息（不到20则以实际为准），返回通知总数
    // 返回值：result包，包括TotalItem标签的全部通知总数，和Data标签的[from,to]区间的通知发布时间、发布单位、公告标题
    // result = get20Data(...)
    var result = {      // 这个是伪造数据，应删除（返回格式应与此一致）
        'Data': [
            {id:'123', createAt:'2017-03-30', department:'本科生院', title:'标题1'},
            {id:'234', createAt:'2017-03-23', department:'学工部', title:'标题2'}
        ],
        'TotalItem': 2
    };
    // 以上
    var jsonn = {};
    jsonn['PageTotal'] = parseInt((result['TotalItem']-1) / 20 + 1);
    jsonn['Title'] = ['通知编号','发布时间','发布单位','通知标题'];
    jsonn['IsShow'] = [false, true, true, true];
    jsonn['Content'] = [];
    for (var i=0; i<result['Data'].length; i++) {
        jsonn['Content'].push({
            '通知编号': result['Data'][i]['id'],
            '发布时间': result['Data'][i]['createAt'],
            '发布单位': result['Data'][i]['department'],
            '通知标题': result['Data'][i]['title']
        });
    }
    return jsonn;
}

router.post('/getData', function (req, res, next) {
    var ID = req.body['通知编号'];
    // 以下是后端数据库的函数：查找通知
    // 返回值：result包，包括该通知的所有信息
    // result = addData(...)
    // 以上
    var jsonn = {};
    jsonn['通知编号'] = result['id'];
    jsonn['发布时间'] = result['createAt'];
    jsonn['发布单位'] = result['department'];
    jsonn['通知标题'] = result['title'];
    jsonn['通知内容'] = result['content'];
    res.json(jsonn);
});

router.post('/addData', function(req, res, next) {
    var department = req.body['发布单位'];
    var title = req.body['通知标题'];
    var content = req.body['通知内容'];
    // 以下是后端数据库的函数：添加通知
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = addData(...)
    // 以上
    var jsonn = {};
    jsonn['status'] = result['status'];
    jsonn['errMsg'] = result['errMsg'];
    res.json(jsonn);
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
    var jsonn = {};
    jsonn['status'] = result['status'];
    jsonn['errMsg'] = result['errMsg'];
    res.json(jsonn);
});

router.post('/deleteData', function(req, res, next) {
    var ID = req.body['通知编号'];
    // 以下是后端数据库的函数：删除通知
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    var jsonn = {};
    jsonn['status'] = result['status'];
    jsonn['errMsg'] = result['errMsg'];
    res.json(jsonn);
});

module.exports = router;
