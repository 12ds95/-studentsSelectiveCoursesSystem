/**
 * Created by iqich on 2017/6/15.
 */
var express = require('express');
var router = express.Router();
var nodeExcel = require('excel-export');

router.get('/', function(req, res, next) {
    var conf = {};
    // var data = [['3140102448','zhou',false, 30,'软件','ke']];
    var data=[
    {
        id:'3140102449',
        name:'Qi',
        sex:true,
        credits:25.5,
        department:'计算机',
        userName:'iqicheng'
    },{
        id:'3140102448',
        name:'zhou',
        sex:false,
        credits:30,
        department:'软件',
        userName:'ke'
    }];
    conf.name = 'studentinfo';
    conf.cols = [{
        caption: 'id',
        type: 'string'
    },
        {
            caption: 'name',
            type: 'date'
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
    res.render('inforeport',{
        data
    })
    //console.log(result);
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    // res.setHeader("Content-Disposition", "attachment; filename= studentinfo.xlsx");
    // //res.setHeader('Content-Type', 'text/plain');
    // res.end(result, 'binary');
});

module.exports = router;