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
module.exports = sequelize;
