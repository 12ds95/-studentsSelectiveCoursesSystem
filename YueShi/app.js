var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var app = express()
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var User = require('./models/user')

mongoose.connect('mongodb://localhost/login')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(require('body-parser').urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port)

console.log('Test start on port'+ port)


// index page
app.get('/',function(req,res){
	res.render('index',{
		title : 'Login'
	})
})

//post uname and passwd
app.post('/login',function(res,req){
	var uname = req.body.user.uname
	var passwd = req.body.user.passwd

})

//signup 
app.post('/user/signup',function(req,res){
	var _user = req.body.user
	//var user = new User(_user)
	// console.log(user)
	User.findByName(_user.name,function(err,user){
		if (err) {
			console.log(err)
		}
		if (user) {
			console.log(user+'Already exist')
			return res.redirect('/')
		}else{
			var user = new User(_user)
			user.save(function(err,user){
				if (err) {
					console.log(err)
				}
				res.redirect('/')
				
			})
		}
	})

	// user.save(function(err){
	// 	if (err) {console.log('app.js: user.save\n'+err)}
	// 	res.redirect('/')
	// })
})

//signin 
// http://www.imooc.com/video/3781
app.post('/user/signin',function(req,res){
	var _user = req.body.user
	var name = _user.name
	var password = _user.password

	User.findOne({name: name},function(err,user){
		if (err) {
			console.log(err)
		}
		if (!user) {		
			return res.redirect('/')
		}
		user.comparePassword(password,function(err,isMatch){
			if (err) {
				console.log(err)
			}
			if (isMatch) {
				console.log('matched')			
				return res.redirect('/')
			}else{
				console.log('Password is not matched')
				return res.redirect('/')
			}
		})
	})
})

//userlist
app.get('/admin/userlist',function(req,res){
	User.fetch(function(err,users){
		if (err) {
			console.log(err)
		}
		res.render('userlist',{
			title: "用户列表",
			users: users
		})
	})

})