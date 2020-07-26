const express = require("express");
const router = express.Router();
const { getErr, asyncHandler } = require("../getSendResult");
const Course = require('../../services/courseService');
const mapSer = require("../../services/mapService");
const stdSer = require("../../services/studentService");
// 管理员端与老师端  teacherId
router.post("/addCourse", asyncHandler(async (req, res) => {
    if (req.job === "a") {
        if (!req.body.tid) {
            res.status(403).send(getErr("没有老师信息"), 403);
            return null;
        }
        req.body.TeacherId = req.body.tid;
        const result = await Course.addCourse(req.body);
        console.log('插入完成');
        return result;
    } else if (req.job === "t") {
        req.body.TeacherId = req.userId;
        const result = await Course.addCourse(req.body);
        console.log('插入完成');
        return result;
    } else {
        res.status(403).send(getErr("暂无权限", 403));
        return null;
    }
}))

// 老师端和管理员有权限，传cid即可
router.post("/updateCourse", asyncHandler(async (req, res) => {
    if (req.job === "a") {
        const result = await Course.updateCourse(req.body.cid, req.body);
        console.log("更新成功")
        return result;
    } else if (req.job === "t") {
        const courses = await Course.getCourseByTeacher(req.userId);
        let flag = false;
        for (let i = 0; i < courses.rows.length; i++) {
            if (courses.rows[i].id == req.body.cid) {
                flag = true;
            }
        }
        if (!flag) {
            res.status(403).send(getErr("无权修改其他老师课程", 403));
            return null;
        }
        console.log(typeof req.body);
        const result = await Course.updateCourse(req.body.cid, req.body);
        console.log("更新成功")
        return result;
    } else {
        res.status(403).send(getErr("暂无权限", 403));
        return null;
    }
}))
//删除课程，老师端和管理员有权限  传入cid
router.get("/delCourse", asyncHandler(async (req, res) => {
    if (req.job !== "a" && req.job !== "t") {
        res.status(403).send(getErr("暂无权限", 403));
        return null;
    }
    //该老师只能删除自己的课
    let flag = false;
    const courses = await Course.getCourseByTeacher(req.userId);
    for (let i = 0; i < courses.rows.length; i++) {
        if (req.query.cid == courses.rows[i].id) {
            flag = true;
            break;
        }
    }
    if (flag) {
        const result = await Course.deleteCourse(req.query.cid);
        return result;
    }
    res.status(403).send(getErr("暂无权限", 403));
    return null;
}))

//查看选课的学生，支持老师端与管理员  传入cid
router.get("/showStudent", asyncHandler(async (req, res) => {
    const mapping = await mapSer.showStdByCid(req.query.cid);
    let result = [];
    for (let i = 0; i < mapping.rows.length; i++) {
        // 通过sid拿到学生信息
        result[i] = await stdSer.getStdById(mapping.rows[i].StudentId);
    }
    console.log("完成查询");
    return result;
}))

// 踢出学生/自主退课  传入cid和sid  匹配一次老师的id是否符合cid的tid
router.get("/outStudent", asyncHandler(async (req, res) => {
    if (req.job === "t") {
        let flag = false;
        const course = await Course.getCourseByCid(req.query.cid);
        console.log(course);
        if (course.TeacherId == req.userId) {
            flag = true;
        }
        if (flag) {
            const result = await mapSer.deleteMap(req.query.sid, req.query.cid);
            console.log("完成删除");
            return result;
        } else {
            res.status(403).send(getErr("暂无权限", 403));
            return null;
        }
    }
    if (req.job === "a") {
        const result = await mapSer.deleteMap(req.query.sid, req.query.cid);
        console.log("完成删除");
        return result;
    }
    if(req.job ==="s"){
        const result = await mapSer.deleteMap(req.userId, req.query.cid);
        console.log("完成删除");
        return result;
    }

}))
router.get("/getAllCourses", asyncHandler(async (req, res) => {
    const result = await Course.getAllCourse();
    console.log("完成查询");
    return result;
}))
module.exports = router;