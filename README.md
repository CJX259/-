### 选课系统的功能

#### 实现不同身份登录，有不同的操作权限

>**学生端**：仅选退课，搜索所有可选课，以及查看课表(算出学生的空余时间，以及总分值)

>**老师端**：增删改查自己的课程（课名，上课时间，上课地点，分值），查看每门课的被选情况（有哪些学生选了这个课），当满人时，对学生进行筛选

> **超级管理员端**：对所有的课程的增删改查，查看每门课被选情况，可对学生进行筛选

##### 技术栈：react+antd+node

### 前端页面   (create-react-app脚手架搭建)

>**登录页面**
>登录和修改密码（不能注册，只能由管理员添加用户）

>**管理员端页面**
>增删改一个老师/学生
>增加一个管理员或修改本管理员
>增删改查课程（查是查哪些学生选了该课）
>筛选学生

>**老师端页面**
>修改自身信息
>显示自己课表
>添加自己课程
>删除自己课程
>查看选课学生
>筛选自己课的学生

>**学生端页面**
>修改个人信息
>查看课表按钮
>选课
>退课

### 功能的实现：

> **用户系统：**
>
> 1. 使用**cookie实现**用户登录判断，并使用node自带的**crypto**进行加密传输，cookie会附带上用户的类型和id，用于后续判断
> 2. 不同的用户类型使用不同的component，以实现**多类客户端**
> 3. 根据请求附带的cookie，判断用户权限以及对数据库进行正确的操作



#### 数据库的表：

1.课程：Course  与学生，老师均是多对多关系

| 属性      | 含义         | 数据类型      |
| --------- | ------------ | ------------- |
| id        | 课程id       | int*（主键）* |
| name      | 课名         | char          |
| time      | 上课时间     | datetime      |
| place     | 上课地点     | char          |
| score     | 分值         | int           |
| capacity  | 课程容量     | int           |
| weekDay   | 上课周       | int           |
| TeacherId | 对应的老师ID | int*（外键）* |

2.学生：

| 属性     | 含义     | 数据类型      |
| -------- | -------- | ------------- |
| id       | 学生id   | int*（主键）* |
| Nob      | 登录号码 | char  unique  |
| name     | 学生名字 | char          |
| password | 密码     | char          |

3.老师：

| 属性     | 含义     | 数据类型      |
| -------- | -------- | ------------- |
| id       | 老师id   | int*（主键）* |
| name     | 名字     | char          |
| Nob      | 登录号码 | char unique   |
| password | 密码     | char          |

4.学生与课程的映射表

| 属性      | 含义               | 数据类型 |
| --------- | ------------------ | -------- |
| id        |                    | 主键     |
| studentId | 学生ID             | int      |
| CourseId  | 学生ID对应的课程ID | int      |

5.超级管理员

| 属性     | 含义   | 数据类型     |
| -------- | ------ | ------------ |
| id       |        | 主键         |
| Nob      | 用户名 | char  unique |
| password | 密码   | char         |



使用**sequelize建立表以及表间关系**

#### 后端接口：

#### ***Course的api:***

>**"/api/course/updateCourse"  更新课程  (POST)
"/api/course/showStudent"   查看选课学生
"/api/course/outStudent"    筛选掉一个学生
"/api/course/addCourse"  添加课程(POST)
"/api/course/delCourse"  删除课程**

#### *std的api:*

>**"/api/std/addStd"  添加学生用户(POST)
"/api/std/updateStd"  修改任意学生信息"(POST)
"/api/std/delStd"  删除学生用户
"/api/std/chooseCourse" 选课
"/api/std/showCourse" 显示学生的课表**

#### *teacher的api:*

>**"/api/teacher/updateTeacher"  修改任意老师信息"(POST)
"/api/teacher/addTeacher" 添加老师用户"(POST)
"/api/teacher/delTeacher"  删除老师用户
"/api/teacher/showCourse"  显示老师的课表**

#### *Admin的api:*

>**"/api/admin/addAdmin" 添加一个超级管理员 用户名不要t和1开头(POST)
"/api/admin/updateAdmin" 修改本管理员信息(POST)**

#### *user的api:*

>**"/api/user/login"  登录(POST)
"/api/user/resetPwd"  修改密码**

#### *admin端登录的权限：*

>**"/api/admin/addAdmin" 添加一个超级管理员 用户名不要t和1开头**
**"/api/admin/updateAdmin" 修改本管理员信息**
"/api/std/addStd"  添加学生用户
"/api/std/updateStd"  修改任意学生信息
"/api/std/delStd"  删除学生用户
"/api/teacher/updateTeacher"  修改任意老师信息
"/api/teacher/addTeacher" 添加老师用户
"/api/teacher/delTeacher"  删除学生用户
"/api/course/addCourse"  添加课程
"/api/course/delCourse"  删除课程
"/api/course/updateCourse"  更新课程  
"/api/course/showStudent"   查看选了该课学生
"/api/course/outStudent"    筛选掉一个学生

#### *学生端登录的权限:*

>**"/api/std/updateStd"   修改本学生信息**
**"/api/std/chooseCourse" 选课**
**"/api/std/showCourse"       显示学生的课表**
"/api/course/outStudent"   筛选掉学生自己（退课）

#### *老师端登录的权限：*

>**"/api/teacher/updateTeacher"  修改本老师的信息**
**"/api/teacher/showCourse"  显示老师的课表**
"/api/course/addCourse"  添加课程
"/api/course/delCourse"  删除课程
"/api/course/updateCourse"  更新课程  
"/api/course/showStudent"   查看选课学生
"/api/course/outStudent"    筛选掉一个学生





