/**
 * Created by iqich on 2017/6/17.
 */
var express = require('express');
var router = express.Router();
var nodeExcel = require('excel-export');

router.get('/', function(req, res, next) {
    var data=[
        [
            '3140102449',
            'Qi',
            true,
            25.5,
            '计算机',
            'iqicheng'
        ],[
            '3140102448',
            'zhou',
            false,
            30,
            '软件',
            'ke'
        ]];
    var conf = {};
    conf.name = 'studentinfo';
    conf.cols = [{
        caption: 'id',
        type: 'string'
    },
        {
            caption: 'name',
            type: 'string'
        },
        {
            caption: 'ismale',
            type: 'bool'
        },
        {
            caption: 'credit',
            type: 'number'
        },
        {
            caption: 'department',
            type: 'string'
        },
        {
            caption: 'uname',
            type: 'string'
        }];

    conf.rows = data;
    var result = nodeExcel.execute(conf);
    //console.log(result);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename= stureport.xlsx");
    // //res.setHeader('Content-Type', 'text/plain');
    res.end(result, 'binary');
});

module.exports = router;