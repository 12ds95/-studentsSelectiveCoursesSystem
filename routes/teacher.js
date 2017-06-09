/**
 * Created by iqich on 2017/5/30.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/applyforclass', function(req, res, next) {
    res.render('applyforclass',{
        title : 'Apply'
    });
});


router.get('/pickStudents', function(req, res, next) {
    res.render('pickStudents',{
        course:'面向对象程序设计',
        studentsPending:[
        {
            id:'3140104444',
            credits:'56'
        },{
            id:'3140105555',
            credits:'52'
        },{
            id:'3140105555',
            credits:'53'
        },{
            id:'3140105555',
            credits:'54'
        },{
            id:'3140105555',
            credits:'55'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105553',
            credits:'56'
        }],
        studentsReady:[
        {
            id:'3140100000',
            credits:'12'
        },{
            id:'3140105555',
            credits:'23'
        },{
            id:'3140105555',
            credits:'24'
        },{
            id:'3140105555',
            credits:'103'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3140105555',
            credits:'56'
        },{
            id:'3232222222',
            credits:'56'
        }]
    });
});

router.post('/teacher/pickStudents/select', function(req, res, next) {
    console.log(req.body);
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
    console.log(req.body);
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

router.post('/applyforclass/upload', function(req, res, next) {
    console.log(req.body);
    var data={
        status: 1
    };
    console.log(data);
    res.json(data);
});
module.exports = router;