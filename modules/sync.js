require("./Student");
require("./Teacher");
require("./Course");
require("./Admin");
require('./Coursestudent');
const sequelize = require("./db");
sequelize.sync().then(_=>{
    console.log("模型同步成功");
})