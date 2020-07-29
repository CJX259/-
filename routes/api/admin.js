const express = require("express");
const router = express.Router();
const adminSer = require('../../services/adminService');
const { asyncHandler, getErr } = require("../getSendResult");
router.post("/addAdmin", asyncHandler(async (req, res, next) => {
    //判断权限
    if (req.job != "a") {
        return "暂无权限";
    }
    const result = await adminSer.addAdmin(req.body.Nob, req.body.password);
    // console.log("添加完毕");
    return result;
}))
router.post("/updateAdmin", asyncHandler(async (req, res, next) => {
    if (req.job != "a") {
        return "暂无权限";
    }
    const result = await adminSer.updateAdmin(req.userId, { password: req.body.password });
    // console.log("更新完毕");
    return result;
}))

module.exports = router;