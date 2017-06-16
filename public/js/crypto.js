/**
 * Created by lenovo on 2017/6/14.
 */
// function  encrypt(text, publicPem) {
//     var NodeRSA = require('node-rsa');
//     var key = new NodeRSA();
//
//     key.importKey(publicPem, 'pkcs8-public-pem');
//     return key.encrypt(text, 'base64');
// }
var NodeRSA = require('node-rsa');
var psw = document.getElementById("psw");
var publicKeyPem = document.getElementById("publicKeyPem").innerHTML;
console.log(publicKeyPem);
var publicKey = new NodeRSA();
publicKey.importKey(publicKeyPem, 'pkcs8-public-pem');
psw.value = publicKey.encrypt(psw.value, 'base64');
// console.log(psw.value);
