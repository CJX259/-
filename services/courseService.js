const Course = require("../modules/Course");
// 查询的时候若需要查外键记得设置include属性！！！
async function addCourse(courseObj) {
    if (typeof courseObj != "object") {
        // console.log("传入课程数据有误");
        return null;
    }
    try {
        const res = await Course.create(courseObj);
        // console.log("课程创建成功");
        return res.toJSON();
    } catch (e) {
        console.log(err);
        return null;
    }
}
async function updateCourse(id, courseObj) {
    if (typeof courseObj != "object") {
        // console.log("传入课程数据有误");
        return null;
    }
    try {
        const res = await Course.update(courseObj, {
            where: {
                id: id
            }
        });
        // console.log('课程更新成功');
        return res;
    } catch (e) {
        console.log(err);
        return null;
    }
}

async function deleteCourse(id) {
    try {
        const res = await Course.destroy({
            where: {
                id: id
            }
        });
        // console.log("课程删除成功");
        return res;
    } catch (e) {
        console.log(err);
        return null;
    }
}

async function getCourseByTeacher(tid) {
    let where = { TeacherId: tid };
    const result = await Course.findAndCountAll({
        where
    });
    return JSON.parse(JSON.stringify(result));
}
async function getCourseByCid(cid) {
    try {
        const result = await Course.findByPk(cid);
        return JSON.parse(JSON.stringify(result));
    } catch (err) {
        console.log(err);
        return null;
    }

}
async function getAllCourse() {
    try {
        const result = await Course.findAll();
        return JSON.parse(JSON.stringify(result));
    } catch (err) {
        console.log(err);
        return null;
    }
}
module.exports = {
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseByTeacher,
    getCourseByCid,
    getAllCourse
}