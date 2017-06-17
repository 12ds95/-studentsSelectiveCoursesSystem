/**
 * Created by iqich on 2017/6/17.
 */
var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {

    // var data = [['3140102448','zhou',false, 30,'软件','ke']];
    var data=[
        {
            id:'3140102656',
            name:'cai',
            ismale:true,
            phone_number:'17816899099',
            department:'计算机',
            uname:'iqicheng',
            info: 'cailaoda'
        },{
            id:'3140102448',
            name:'zhou',
            ismale:false,
            phone_number:'17837492482',
            department:'软件',
            uname:'ke',
            info: '蔡老大'
        }];
    res.render('tchreport',{data}
    )

});


module.exports = router;