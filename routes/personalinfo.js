/**
 * Created by iqich on 2017/5/30.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('personalinfo',{
        title : 'Personalinfo',
        studentID : '314010xxxx',
        studentName : 'xxx'
    });
});

module.exports = router;