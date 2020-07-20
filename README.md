#选课系统的功能
###实现不同身份登录，有不同的操作权限
>**学生端**：仅选退课，搜索所有可选课，以及查看课表(算出学生的空余时间，以及总分值)

>**老师端**：增删改查自己的课程（课名，上课时间，上课地点，分值），查看每门课的被选情况（有哪些学生选了这个课），当满人时，对学生进行筛选

>**超级管理员**：对所有的课程的增删改查，查看每门课被选情况，可对学生进行筛选
###数据库的表：
    1.课程：Course  与学生，老师均是多对多关系
    id          课程id              int  主键
    name        课名                char
    time        上课时间            datetime
    place       上课地点            char
    score       分值                int
    capacity    课程容量            int
    weekDay     周几上              int     返回值是 0（周日） 到 6（周六） 之间的一个整数
    TeacherId   对应的老师ID        int  外键
    
    2.学生：
    id          学生id              int 主键
    name        学生名字            char
    Nob         登录号码            char    unique
    password    密码                char

    3.老师：
    id          老师id              int  主键
    name        名字                char
    Nob         登录号码            char    unique
    password    密码                char

    4.学生与课程的映射表
    id          主键
    studentId   学生Id              int
    CourseId    学生Id对应的课程Id   int

    5.超级管理员
    id          主键
    Nob         用户名              char    unique
    password    密码                char

###使用sequelize建立表以及表间关系。4表就由sequelize生成

##后端接口：


####*Course的api:*
>**"/api/course/updateCourse"  更新课程  (POST)
"/api/course/showStudent"   查看选课学生
"/api/course/outStudent"    筛选掉一个学生
"/api/course/addCourse"  添加课程(POST)
"/api/course/delCourse"  删除课程**

####*std的api:*
>**"/api/std/addStd"  添加学生用户(POST)
"/api/std/updateStd"  修改任意学生信息"(POST)
"/api/std/delStd"  删除学生用户
"/api/std/chooseCourse" 选课
"/api/std/showCourse" 显示学生的课表**

####*teacher的api:*
>**"/api/teacher/updateTeacher"  修改任意老师信息"(POST)
"/api/teacher/addTeacher" 添加老师用户"(POST)
"/api/teacher/delTeacher"  删除老师用户
"/api/teacher/showCourse"  显示老师的课表**

####*Admin的api:*
>**"/api/admin/addAdmin" 添加一个超级管理员 用户名不要t和1开头(POST)
"/api/admin/updateAdmin" 修改本管理员信息(POST)**

####*user的api:*
>**"/api/user/login"  登录(POST)
"/api/user/resetPwd"  修改密码**


####*admin端登录的权限：*
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

####*学生端登录的权限:*
>**"/api/std/updateStd"   修改本学生信息**
**"/api/std/chooseCourse" 选课**
**"/api/std/showCourse"       显示学生的课表**
"/api/course/outStudent"   筛选掉学生自己（退课）

####*老师端登录的权限：*
>**"/api/teacher/updateTeacher"  修改本老师的信息**
**"/api/teacher/showCourse"  显示老师的课表**
"/api/course/addCourse"  添加课程
"/api/course/delCourse"  删除课程
"/api/course/updateCourse"  更新课程  
"/api/course/showStudent"   查看选课学生
"/api/course/outStudent"    筛选掉一个学生
