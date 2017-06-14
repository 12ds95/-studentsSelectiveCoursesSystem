# issue 1
* 直接把department改成字符串，取消这个表

# studentsSelectiveCoursesSystem

In the working directory, use
`npm install`
to install dependencies

use 
`bower install` 
to install bootstrap

*(Although, the dependencies are included in this project)*

You have to install mongoDB to use this web app, if you have mongoDB, 

use command line

`mongod`
to run mongoDB before you run this webapp

## 现在仍需要实现的功能：

* department无法添加成功
* admin/reviewapplyforclass中的内容由刘启明完成
* applyforClass 也应该有刘启明完成
* bySelection 也没有完成
* 不明白changepw/personalinfo的路由功能
* changepw修改密的功能没有完成
* curriculum中显示课表的内容要与相应的学生挂钩
* index中用户登录的时候，密码的匹配算法有问题。无法正常的登录
* 获取用户类型的函数中需要添加管理员类型
* index中无法获取新闻
* noticeManager中全部的与News有关的操作
* personalInfo 中提取个人信息，修改个人信息，
* personalInfo 中修改密码的功能与changepw重合
* reselect 补选页面，尚未完成
* select 选课页面 尚未实现
* student 页面，显示学生的个人信息
* teacher 中pickStudent的功能需要从请求中过去数据
* /teacher/pickStudents/select 补选申请，还没有设计完
* /teacher/pickStudents/delete
* teacherManager显示老师的列表。需要从刘启明那里合并
* 想知道User的路由是不是被弃用了

## 新增的功能
* 经过检查，密码比对的功能是正常的
* teacherManager添加老师的时候，也应该在User中添加对应的用户
* studentManager 页面的数据库跑通
* 把用到department的部分基本改成了字符串
* 按页查找，可以使用getAPage()函数来进行操作

## 需要调试的bug
* schema/teacher.js 中，无法添加新的User - 会在 teacherManager中添加老师的时候体现出来 也就是teacherManager无法添加老师

## 需要协作完成的
* teacherManager删除和修改教师的测试 - 这里的跳转还没有做吗？