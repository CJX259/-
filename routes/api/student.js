const express = require("express");
const router = express.Router();
const { getErr, asyncHandler } = require("../getSendResult");
const stdSer = require('../../services/studentService');
const mapSer = require("../../services/mapService");
const courseSer = require("../../services/courseService");
//仅超级管理员端
router.post("/addStd", asyncHandler(async (req, res) => {
    if (req.job === "a") {
        const result = await stdSer.addStd(req.body);
        return result;
    } else {
        console.log("暂无权限");
        res.status(403).send(getErr("暂无权限", 403));
    }
}))
//学生端和管理员端（管理员要传学生id  sid）
router.post("/updateStd", asyncHandler(async (req, res) => {
    if (req.job === "a") {
        const result = await stdSer.updateStd(req.body.sid, req.body);
        return result;
    } else if (req.job === "s") {
        const result = await stdSer.updateStd(req.userId, req.body);
        return result;
    } else {
        console.log("暂无权限");
        res.status(403).send(getErr("暂无权限", 403));
    }
}))
router.get("/delStd", asyncHandler(async (req, res) => {
    // console.log(req.query.sid);
    if (!req.query.sid) {
        res.status(403).send(getErr("未传参数", 403));
        return null
    }
    if (req.job === "a") {
        const result = await stdSer.deleteStd(req.query.sid);
        return result;
    } else {
        console.log("暂无权限");
        res.status(403).send(getErr("暂无权限", 403));
        return null
    }
}))
//学生选课  需要学生id和课程id  sid与cid  仅学生端     如果选一个不存在的cid会怎样？报错
router.get("/chooseCourse", asyncHandler(async (req, res) => {
    // console.log(req.query.sid);
    if (!req.query.cid) {
        res.status(403).send(getErr("未传参数", 403));
        return null
    }
    // 
    if (req.job === "s") {
        const result = await mapSer.stdChooseCourse(req.userId, req.query.cid);
        console.log('完成选课');
        return result;
    } else {
        console.log("暂无权限");
        res.status(403).send(getErr("暂无权限", 403));
    }
}))
//显示学生课表  学生端可用，管理员需要传sid
router.get('/showCourse', asyncHandler(async (req, res) => {
    if (req.job == "a") {
        if (!req.query.sid) {
            console.log("缺少参数sid");
            res.status(403).send(getErr("缺少参数sid", 403));
        }
        let courses = await mapSer.showCourseBySid(req.query.sid);
        let result = [];
        for (let i = 0; i < courses.rows.length; i++) {
            result[i] = await courseSer.getCourseByCid(courses.rows[i].CourseId)
        }
        console.log("查询成功");
        //通过courseId查询course
        return result;
    } else if (req.job == "s") {
        const courses = await mapSer.showCourseBySid(req.userId);
        let result = [];
        for (let i = 0; i < courses.rows.length; i++) {
            result[i] = await courseSer.getCourseByCid(courses.rows[i].CourseId)
        }
        console.log("查询成功");
        return result;
    } else {
        console.log("暂无权限");
        res.status(403).send(getErr("暂无权限", 403));
    }
}))
router.get("/getAllStudent", asyncHandler(async (req,res)=>{
    const result = await stdSer.getAllStudent();
    return result;
}))
module.exports = router;