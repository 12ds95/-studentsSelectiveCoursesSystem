/**
 * Created by iqich on 2017/6/15.
 */
var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {

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
    res.render('inforeport',{data}
    )

});


module.exports = router;