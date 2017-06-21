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
var oldpw = document.getElementById("oldpw");
var newpw = document.getElementById("newpw");
var confirmpw = document.getElementById("confirmpw");
var publicKeyPem = document.getElementById("publicKeyPem").innerHTML;
console.log(publicKeyPem);
var publicKey = new NodeRSA();
publicKey.importKey(publicKeyPem, 'pkcs8-public-pem');
oldpw.value = publicKey.encrypt(oldpw.value, 'base64');
newpw.value = publicKey.encrypt(newpw.value, 'base64');
confirmpw.value = publicKey.encrypt(confirmpw.value, 'base64');

// console.log(psw.value);
