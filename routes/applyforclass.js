/**
  * Created by iqich on 2017/5/30.
 **/
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('applyforclass',{
        title : 'Apply'
    });
});


module.exports = router;