const Coursestudent = require('../modules/Coursestudent');
const { Op } = require('sequelize');
/**
 * 
 * @param {学生id} sid  
 * @param {课程id} cid
 * 某学生选了某课，产生一个mapping 
 */
async function stdChooseCourse(sid, cid) {
    try {
        let obj = { CourseId: cid, StudentId: sid };
        const res = await Coursestudent.create(obj);
        // console.log("选课成功");
        return res.toJSON();
    } catch (e) {
        console.log(e);
        return null;
    }
}
/**
 * 
 * @param {*} sid 
 * @param {*} cid 
 * 某学生退选某课，删去一个mapping
 */
async function deleteMap(sid, cid) {
    try {
        const res = await Coursestudent.destroy({
            where: {
                [Op.and]: [
                    { StudentId: sid },
                    { CourseId: cid }
                ]
            }
        });
        // console.log("退课成功");
        return res;
    } catch (e) {
        console.log(e);
        return null;
    }
}
//通过学生id查找该学生已选的课程
async function showCourseBySid(sid) {
    try {
        const res = await Coursestudent.findAndCountAll({
            where : {
                StudentId :sid
            }
        });
        // console.log("查询成功");
        res.rows = JSON.parse(JSON.stringify(res.rows));
        // console.log(res);
        return res;
    }catch(e){
        console.log(e);
        return null;
    }
}

//通过cid来查找已选择该课程的学生们
async function showStdByCid(cid) {
    try {
        const res = await Coursestudent.findAndCountAll({
            where : {
                CourseId :cid
            }
        });
        // console.log("查询成功");
        res.rows = JSON.parse(JSON.stringify(res.rows));
        // console.log(res);
        return res;
    }catch(e){
        console.log(e);
        return null;
    }
}

module.exports = {
    stdChooseCourse,
    deleteMap,
    showCourseBySid,
    showStdByCid
}