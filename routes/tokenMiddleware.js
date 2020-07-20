const {getErr} = require("./getSendResult");
const {pathToRegexp} = require("path-to-regexp");
const crypt = require("../utils/crypt");
const needToApi = [
    {method : "POST", path :"/api/user/resetPwd"},
    {method : "POST", path : "/api/admin/addAdmin"},
    {method : "POST", path : "/api/admin/updateAdmin"},
    {method : "POST", path : "/api/teacher/updateTeacher"},
    {method : "POST", path : "/api/teacher/addTeacher"},
    {method : "GET", path : "/api/teacher/delTeacher"},
    {method : "GET", path : "/api/teacher/showCourse"},
    {method : "POST", path : "/api/std/addStd"},
    {method : "POST", path : "/api/std/updateStd"},
    {method : "GET", path : "/api/std/delStd"},
    {method : "GET", path : "/api/std/chooseCourse"},
    {method : "GET", path : "/api/std/showCourse"},
    {method : "POST", path : "/api/course/addCourse"},
    {method : "POST", path : "/api/course/updateCourse"},
    {method : "GET", path : "/api/course/delCourse"},
    {method : "GET", path : "/api/course/showStudent"},
    {method : "GET", path : "/api/course/outStudent"},
];

//解析token
module.exports = (req, res, next)=>{
    const apis = needToApi.filter(api=>{
        const reg = pathToRegexp(api.path);
        return api.method === req.method && reg.test(req.path);
    });
    //没有匹配到路径
    if(apis.length === 0){
        next();
        return ;
    }
    let token = req.cookies.token;
    if(!token){
        token = req.headers.authorization;
    }
    if(!token){
        handleNoToken(req,res,next);
        console.log('未登录');
        return ;
    }
    //解密token
    let msg =  crypt.decrypt(token);
    //通过job判断是哪个端发起的请求
    req.userId =msg.slice(1);
    req.job = msg[0];
    next();
}
function handleNoToken(req,res,next){
    res.status(403).send(getErr("you don't have a token", 403));
}