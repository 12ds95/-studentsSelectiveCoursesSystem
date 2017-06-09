/**
 * Created by iqich on 2017/6/6.
 */
var express = require('express');
var router = express.Router();
var captchapng = require('captchapng');

router.get('/', function(req, res, next) {
    var code = parseInt(Math.random()*9000 + 1000);
    req.session.checkcode = code;
    var p = new captchapng(100,30,code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
});

module.exports = router;

