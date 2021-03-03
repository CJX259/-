const getSendResult = require("./getSendResult");

module.exports = function sendErr(err, req, res, next){
    if(err){
        console.log(111);
        res.status(500).send(getSendResult.getErr(err instanceof Error ? err.message : err , 500));
        return null;
    }else{
        next();
    }
}