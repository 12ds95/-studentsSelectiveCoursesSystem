var express = require('express');
var router = express.Router();

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
    res.render('studentManager',{
        title: '学生信息管理页',
        leftTitle: leftTitle,
        leftImage: leftImage,
        leftText: leftText,
        filterNameData: filterNameData,
        filterOpData: filterOpData
    });
});

router.post('/tableData', function(req, res, next) {
    var pageNum = req.body['pageNum'];
    var itemPerPage = 20;
    var result = getStudentData((pageNum-1)*itemPerPage+1, pageNum*itemPerPage);
    res.json(result);
});
function getStudentData(from, to) {
    // 以下是后端数据库的函数：读取20位学生信息（不到20则以实际为准），返回学生总数
    // 返回值：result包，包括TotalItem标签的全部学生总数，和Data标签的[from,to]区间的学生学号、姓名、学院信息
    // result = get20Data(...)
    var result = {      // 这个是伪造数据，应删除（返回格式应与此一致）
        'Data': [
            {id:'1_1', name:'学生张三', department:'计算机科学与技术学院'},
            {id:'1_2', name:'学生李四', department:'信电'}
        ],
        'TotalItem': 4
    };
    // 以上
    var jsonn = {};
    jsonn['PageTotal'] = parseInt((result['TotalItem']-1) / 20 + 1);
    jsonn['Title'] = ['学号','姓名','学院'];
    jsonn['Content'] = [];
    for (var i=0; i<result['Data'].length; i++) {
        jsonn['Content'].push({
            '学号': result['Data'][i]['id'],
            '姓名': result['Data'][i]['name'],
            '学院': result['Data'][i]['department']
        });
    }
    return jsonn;
}

router.post('/getData', function (req, res, next) {
    var ID = req.body['学号'];
    // 以下是后端数据库的函数：查找学生
    // 返回值：result包，包括该学生的所有信息
    // result = addData(...)
    // 以上
    var jsonn = {};
    jsonn['学号'] = result['id'];
    jsonn['性别'] = result['ismale'] === true ? '男': '女';
    jsonn['姓名'] = result['name'];
    jsonn['学院'] = result['department'];
    jsonn['学分'] = result['credit'];
    res.json(jsonn);
});

router.post('/addData', function(req, res, next) {
    var ID = req.body['学号'];
    var name = req.body['姓名'];
    var gender = req.body['性别'];
    var department = req.body['学院'];
    var credit = req.body['学分'];
    // 以下是后端数据库的函数：添加学生
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = addData(...)
    // 以上
    var jsonn = {};
    jsonn['status'] = result['status'];
    jsonn['errMsg'] = result['errMsg'];
    res.json(jsonn);
});

router.post('/modifyData', function(req, res, next) {
    var ID = req.body['学号'];
    var name = req.body['姓名'];
    var gender = req.body['性别'];
    var department = req.body['学院'];
    var credit = req.body['学分'];
    // 以下是后端数据库的函数：修改学生信息
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    var jsonn = {};
    jsonn['status'] = result['status'];
    jsonn['errMsg'] = result['errMsg'];
    res.json(jsonn);
});

router.post('/deleteData', function(req, res, next) {
    var ID = req.body['学号'];
    // 以下是后端数据库的函数：修改学生信息
    // 返回值：result包，包括是否成功status（成功：0，失败：-1）、错误原因errMsg
    // result = modifyData(...)
    // 以上
    var jsonn = {};
    jsonn['status'] = result['status'];
    jsonn['errMsg'] = result['errMsg'];
    res.json(jsonn);
});

module.exports = router;
