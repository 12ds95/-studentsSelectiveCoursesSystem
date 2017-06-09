/**
 * Created by iqich on 2017/5/30.
 */
var express = require('express');
var router = express.Router();
var ApplyClass = require('../models/ApplyClass')
    ,Course = require('../models/Course')
;

/* GET home page. */
router.get('/applyforclass', function(req, res, next) {
    res.render('applyforclass',{
        title : 'Apply'
    });
});


router.get('/pickStudents', function(req, res, next) {
    // 需要变成从请求中获取
    var tid = 'teacher1';
    var cid = '230202030';

    ApplyClass.fetchStu(tid,cid,function (err, stuPending) {
        Course.fetchStu(cid,tid,function (err, stuReady) {
            res.render('pickStudents',{
                course:'面向对象程序设计',
                studentsPending:stuPending,
                studentsReady:stuReady
            });
        })
    })

});

router.post('/teacher/pickStudents/select', function(req, res, next) {
    console.log(req);
    var data={
        status: 1,
        studentsPending:[
        {
            id:'222222222',
            credits:'5'
        },{
            id:'3140102223',
            credits:'52'
        },{
            id:'3140102224',
            credits:'53'
        },{
            id:'3140102225',
            credits:'56'
        },{
            id:'3140102226',
            credits:'56'
        }],
        studentsReady:[
        {
            id:'3140100000',
            credits:'12'
        },{
            id:'3140100005',
            credits:'53'
        },{
            id:'3140100001',
            credits:'52'
        },{
            id:'3232220002',
            credits:'51'
        }]};
        console.log(data);
    res.json(data);
});

router.post('/teacher/pickStudents/delete', function(req, res, next) {
    console.log(req);
    var data={
        status: 1,
        studentsReady:[
        {
            id:'222222222',
            credits:'5'
        },{
            id:'3140102223',
            credits:'52'
        },{
            id:'3140102224',
            credits:'53'
        },{
            id:'3140102225',
            credits:'56'
        },{
            id:'3140102226',
            credits:'56'
        }],
        studentsPending:[
        {
            id:'3140100000',
            credits:'12'
        },{
            id:'3140100005',
            credits:'53'
        },{
            id:'3140100001',
            credits:'52'
        },{
            id:'3232220002',
            credits:'51'
        }]};
        console.log(data);
    res.json(data);
});
module.exports = router;