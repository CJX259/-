// 需要多对多的学生与课程
// 需要一对多的老师与课程  生成外键
const Teacher = require("./Teacher");
const Course = require("./Course");

Teacher.hasMany(Course);
Course.belongsTo(Teacher);

