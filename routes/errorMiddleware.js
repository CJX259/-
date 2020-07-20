const getSendResult = require("./getSendResult");

module.exports = function sendErr(err, req, res, next){
    if(err){
        res.status(500).send(getSendResult.getErr(err instanceof Error ? err.message : err , 500));
    }else{
        next();
    }
}