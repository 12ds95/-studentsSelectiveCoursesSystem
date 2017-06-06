/**
 * Created by iqich on 2017/5/30.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('changepw',{
        title : '修改密码'
    });
});

module.exports = router;