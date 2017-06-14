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

* admin/reviewapplyforclass中的内容由刘启明完成
* applyforClass 也应该有刘启明完成
* bySelection 也没有完成
* 不明白changepw/personalinfo的路由功能
* changepw修改密的功能没有完成
* curriculum中显示课表的内容要与相应的学生挂钩
* index中用户登录的时候，密码的匹配算法有问题。无法正常的登录
* 获取用户类型的函数中需要添加管理员类型
* personalInfo 中修改密码的功能与changepw重合
* reselect 补选页面，尚未完成
* select 选课页面 尚未实现
* teacher 中pickStudent的功能需要从请求中获取数据


## 正在进行的工作
* /teacher/pickStudents/delete - 感觉好难，明天再写


## 新增的功能
* 弃用了User路由
* student 页面，显示学生的个人信息
* personalInfo 中提取个人信息，修改个人信息，

### Previous Commit
* noticeManager中全部的与News有关的操作
* Notice 与 News 暂时当做同一个东西了，不知道是否可以？
* 实现index中获取新闻
* 经过检查，密码比对的功能是正常的
* teacherManager添加老师的时候，也应该在User中添加对应的用户
* studentManager 页面的数据库跑通
* 把用到department的部分基本改成了字符串
* 重新实现了按页查找，可以使用getAPage(pageSize)函数来进行操作



## 需要调试的bug

* schema/teacher.js 中，无法添加新的User - 会在 teacherManager中添加老师的时候体现出来 也就是teacherManager无法添加老师
* schema/student.js 中，无法添加新的User，导致无法添加新的学生



## 需要协作完成的
* teacherManager删除和修改教师的测试 - 这里的跳转还没有做吗？
* 首页的新闻部分已经按照大葱的格式写了，但是还是无法获取到作者以及创建时间的信息。
* student路由中，显示学生信息的前端json格式需要修改
### 大葱
* noticeManager中 /getData /deleteData 中的通知编号如何获取？ - 可以改成按照标题获取