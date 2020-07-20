const log4js = require("log4js");
const path = require("path");

log4js.configure({
    appenders: {
        sql: {
            type: "dateFile",
            filename: path.resolve(__dirname, "logs", "sql", "logging.log"),
            keepFileExt: true,
            maxLogSize: 1024 * 1024,
            layout: {
                type: "pattern",
                pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
            }
        },
        default: {  //一定要设置一个默认
            type: "stdout"
        }
    },
    categories :{
        sql : {
            appenders : ["sql"],
            level : "all"
        },
        default : {
            appenders  :["default"],
            level : "all"
        }
    }
});
process.on("exit", ()=>{
    log4js.shutdown();
})
const sqlLogger = log4js.getLogger('sql');

module.exports.sqlLogger = sqlLogger; 