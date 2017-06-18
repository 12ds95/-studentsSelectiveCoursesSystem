/**
 * Created by iqich on 2017/6/17.
 */
var express = require('express');
var router = express.Router();
var nodeExcel = require('excel-export');

router.get('/', function(req, res, next) {
    var data=[
        [
            '3140102656',
            'cai',
            true,
            '17816899099',
            '计算机',
            'iqicheng',
            'cailaoda'
        ],[
            '3140102448',
            'zhou',
            false,
            '17837492482',
            '软件',
            'ke',
            '蔡老大'
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
            caption: 'phonenumber',
            type: 'string'
        },
        {
            caption: 'department',
            type: 'string'
        },
        {
            caption: 'uname',
            type: 'string'
        },
        {
            caption: 'info',
            type: 'string'
        }];

    conf.rows = data;
    var result = nodeExcel.execute(conf);
    //console.log(result);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename= tchreport.xlsx");
    // //res.setHeader('Content-Type', 'text/plain');
    res.end(result, 'binary');
});

module.exports = router;