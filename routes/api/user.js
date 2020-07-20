const adminSer = require('../../services/adminService');
const stdSer = require('../../services/studentService');
const teaSer = require('../../services/teacherService');
const express = require('express');
const crypt = require('../../utils/crypt');
const router = express.Router();
const { asyncHandler, getResult } = require("../getSendResult");
router.post("/login", asyncHandler(async (req, res) => {
    const Nob = req.body.Nob;
    let job = "";
    let result = null;
    if (Nob[0] == "t") {
        //老师端登录
        result = await teaSer.login(Nob, req.body.password);
        job = "t";
    }
    else if (Nob[0] == "1") {
        //学生端登录
        result = await stdSer.login(Nob, req.body.password);
        job = "s";
    } else {
        //超级管理员端登录
        result = await adminSer.login(Nob, req.body.password);
        job = "a";
    }
    if (result) {
        setCookie(res, result, job);
        return result;
    } else {
        return null;
    }
}));
function setCookie(res, result, job) {
    //登录成功,返回一个crypto加密的cookie
    //加密id，作为token返回
    let value = crypt.encrypt(job + result.id + "");
    res.cookie("token", value, {
        maxAge: 60 * 1000 * 10
    });
    //给移动端设置
    // res.header("authorization",value);
}

router.post("/resetPwd", asyncHandler(async (req, res) => {
    //检测身份
    let result = null;
    if (req.job == "t") {
        result = await teaSer.updateTeacher(req.userId, {
            password: req.body.password
        })
    } else if (req.job == "s") {
        result = await stdSer.updateStd(req.userId, {
            password: req.body.password
        })
    } else if (req.job == "a") {
        result = await adminSer.updateAdmin(req.userId, {
            password: req.body.password
        })
    };
    if (result) {
        console.log("修改完毕");
        return result;
    }
    return null;
}))
// router.get("/getTeacher", asyncHandler(async (req, res) => {
//     const result = await teaSer.getTeacherById(req.userId);
//     if (result) {
//         return result;
//     }
//     else {
//         return null;
//     }
// }))


module.exports = router;
