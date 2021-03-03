
module.exports.getErr = (err="server internal error", errCode = 500)=>{
    return {
        code : errCode,
        msg : err,
        data : null
    };
}

module.exports.getResult = (result, msg="success")=>{
    return {
        msg: msg,
        data: result,
        code : 0
    }
}
module.exports.asyncHandler =  (handle)=>{
    return async (req,res,next)=>{
        try{
            const result = await handle(req,res,next);
            res.send(module.exports.getResult(result));
            return null;
        }catch(e){
            throw new Error(e);
        }
    }
}