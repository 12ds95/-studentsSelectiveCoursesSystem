/**
 * Created by lenovo on 2017/6/14.
 */
var NodeRSA = require('node-rsa');

var myRSAkey = new NodeRSA({b: 512});
var publicKeyPem = myRSAkey.exportKey('pkcs8-public-pem');
var privateKeyPem = myRSAkey.exportKey('pkcs1-pem');
var publicKey = new NodeRSA();
var privateKey = new NodeRSA();

publicKey.importKey(publicKeyPem, 'pkcs8-public-pem');
privateKey.importKey(privateKeyPem, 'pkcs1-pem');

console.log(publicKeyPem);

module.exports.publicKeyPem = publicKeyPem;
module.exports.privateKeyPem = privateKeyPem;
module.exports.publicKey = publicKey;
module.exports.privateKey = privateKey;

// value = publicKey.encrypt('111', 'base64');
// console.log(value);
// value = 'w01iBbMzIKRnQ7Nkd3ehr7AVaYe0AWtSCf8LXWGAyTTdovyegEJiuxaMXbBkO4vqCYX7/1tJ4pfkUU+O1OibWA==';
// privateKey.decrypt(value, 'utf-8');




