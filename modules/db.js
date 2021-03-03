const { Sequelize } = require("sequelize");
const { sqlLogger } = require("../logger");
const sequelize = new Sequelize('selectClassDb', "root", "567890xw", {
    host: "cdb-oqaw3yte.cd.tencentcdb.com",
    dialect: "mysql",
    port: "10020",
    logging: msg=>{
        sqlLogger.debug(msg);
    }
});
// const sequelize = new Sequelize('selectClassDb', "root", "123456", {
//     host: "127.0.0.1",
//     dialect: "mysql",
//     port: "3306",
//     logging: msg=>{
//         sqlLogger.debug(msg);
//     }
// });
module.exports = sequelize;
