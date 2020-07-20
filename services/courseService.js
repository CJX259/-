const Course = require("../modules/Course");
// 查询的时候若需要查外键记得设置include属性！！！
async function addCourse(courseObj) {
    if(typeof courseObj != "object"){
        console.log("传入课程数据有误");
        return null;
    }
    try {
        const res = await Course.create(courseObj);
        console.log("课程创建成功");
        return res.toJSON();
    } catch (e) {
        return e;
    }
}
async function updateCourse(id, courseObj) {
    if(typeof courseObj != "object"){
        console.log("传入课程数据有误");
        return null;
    }
    try {
        const res = await Course.update(courseObj, {
            where: {
                id: id
            }
        });
        console.log('课程更新成功');
        return res;
    } catch (e) {
        return e;
    }
}
async function deleteCourse(id) {
    try {
        const res = await Course.destroy({
            where: {
                id: id
            }
        });
        console.log("课程删除成功");
        return res;
    } catch (e) {
        return e;
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
    const result = await Course.findByPk(cid);
    return JSON.parse(JSON.stringify(result));
}
module.exports = {
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseByTeacher,
    getCourseByCid
}