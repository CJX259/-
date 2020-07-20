const { Sequelize } = require("sequelize");
const { sqlLogger } = require("../logger");
const sequelize = new Sequelize('selectClassDb', "root", "123456", {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: msg=>{
        sqlLogger.debug(msg);
    }
});
module.exports = sequelize;
