const express = require("express");
const router = express.Router();
const { getErr, asyncHandler } = require('../getSendResult');
const teaSer = require('../../services/teacherService');
const CourseSer = require('../../services/courseService');
/**
 * admin端的form需要传tid，teacher不需要
 */
router.post("/updateTeacher", asyncHandler(async (req, res) => {
    if (req.job === "s" || !req.job) {
        console.log("无权访问");
        res.status(403).send(getErr("暂无权限", 403));
    }
    let result = null;
    if (req.job === "t") {
        result = await teaSer.updateTeacher(req.userId, req.body);
    } else {
        //admin端
        result = await teaSer.updateTeacher(req.body.tid, req.body);
    }
    if (result) {
        console.log("更新完毕");
        return result;
    }
    return null;
}))
//仅admin端
router.post("/addTeacher", asyncHandler(async (req, res) => {
    let result = null;
    //admin端
    if (req.job == "a") {
        result = await teaSer.addTeacher(req.body);
    } else {
        console.log("无权访问");
        res.status(403).send(getErr("暂无权限", 403));
        return null;
    }
    console.log(result);
    return result;
}))

//仅admin端 需要给tid
router.get("/delTeacher", asyncHandler(async (req, res) => {
    let result = null;
    //admin端
    if (req.job == "a") {
        result = await teaSer.deleteTeacher(req.query.tid);
    } else {
        console.log("无权访问");
        res.status(403).send(getErr("暂无权限", 403));
        return null;
    }
    console.log(result);
    return result;
}))

//显示老师课表  管理员和老师端可用
router.get("/showCourse", asyncHandler(async (req, res) => {
    if (req.job !== "a" && req.job !== 't') {
        res.status(403).send(getErr("暂无权限", 403));
        return null;
    }
    if (req.job == "t") {
        const result = await CourseSer.getCourseByTeacher(req.userId);
        return result;
    }
    if (req.job == "a") {
        if (!req.query.tid) {
            res.status(403).send(getErr("缺少参数", 403));
            return null;
        }
        const result = await CourseSer.getCourseByTeacher(req.query.tid);
        return result;
    }
}))
router.get("/getTeacherById", asyncHandler(async (req, res) => {
    if (!req.query.tid) {
        res.status(403).send(getErr("缺少参数", 403));
        return null;
    }
    const result = await teaSer.getDetailById(req.query.tid);
    return result;
}))
router.get("/getAllTeacher", asyncHandler(async (req,res)=>{
    const result = await teaSer.getAllTeacher();
    return result;
}))
module.exports = router;