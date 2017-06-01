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
    var itemPerPage = 20;
    var result = getTeacherData((pageNum-1)*itemPerPage+1, pageNum*itemPerPage);
    res.json(result);
});
function getTeacherData(from, to) {     // 取[from,to]的数据
    var result;
    if (from === 1) {
        result = {
            'Title': ['公告标题','发布单位','发布时间'],
            'Content': [
                ['1_1','本科生院','2017-03-30'],
                ['1_2','学工部','2017-03-23']
            ],
            'pageTotal': 4
        }
    } else if(from === 21) {
        result = {
            'Title': ['公告标题','发布单位','发布时间'],
            'Content': [
                ['2_1','本科生院','2017-03-30'],
                ['2_2','学工部','2017-03-23']
            ],
            'pageTotal': 4
        }
    } else if(from === 41) {
        result = {
            'Title': ['公告标题','发布单位','发布时间'],
            'Content': [
                ['3_1','本科生院','2017-03-30'],
                ['3_2','学工部','2017-03-23']
            ],
            'pageTotal': 4
        }
    } else {
        result = {
            'Title': ['公告标题','发布单位','发布时间'],
            'Content': [
                ['4_1','本科生院','2017-03-30'],
                ['4_2','学工部','2017-03-23']
            ],
            'pageTotal': 4
        }
    }
    return result;
}

router.post('/addData', function(req, res, next) {
    var teacherID = req.body['公告标题'];
    var teacherName = req.body['发布单位'];
    var teacherDepartment = req.body['发布时间'];
    console.log(teacherID, teacherName, teacherDepartment);
    res.json({'status':-1, 'errMsg':'其实没有错'});
});

module.exports = router;
