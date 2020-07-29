const Student = require("../modules/Student");
const md5 = require("md5");
const { Op } = require("sequelize");

async function addStd(stdObj) {
    if (typeof stdObj != "object") {
        // console.log("传入学生数据有误");
        return null;
    }
    stdObj.password = md5(stdObj.password);
    try {
        const res = await Student.create(stdObj);
        // console.log('添加成功');
        return res.toJSON();
    } catch (e) {
        console.log(e);
        return null;
    }
}
async function updateStd(id, stdObj) {
    if (typeof stdObj != "object") {
        // console.log("传入学生数据有误");
        return null;
    }
    stdObj.password = stdObj.password ? md5(stdObj.password) : undefined;
    try {
        const res = await Student.update(stdObj, {
            where: {
                id: id
            }
        });
        // console.log("修改学生id：" + id + "，成功");
        return res;
    } catch (e) {
        console.log(e);
        return null;
    }
}
async function deleteStd(id) {
    try {
        const res = await Student.destroy({
            where: {
                id: id
            }
        });
        // console.log("学生：" + id + "删除成功");
        return res;
    } catch (e) {
        console.log(e);
        return null;
    }
}
//学生端登录
async function login(Nob, pwd) {
    pwd = md5(pwd);
    try {
        const res = await Student.findOne({
            where: {
                [Op.and]: [
                    { Nob: Nob },
                    { password: pwd }
                ]
            },
            attributes: ["id", "Nob", "name"]
        });
        return JSON.parse(JSON.stringify(res));
    } catch (e) {
        console.log(e);
        return null;
    }

}
async function getStdById(sid) {
    const res = await Student.findByPk(sid);
    return JSON.parse(JSON.stringify(res));
}
async function getDetailById(id) {
    try {
        const res = await Student.findByPk(id,
            {
                attributes: ["id", "Nob", "name"]
            });
        return JSON.parse(JSON.stringify(res));
    } catch (e) {
        console.log(e);
        return null;
    }
}
async function getAllStudent(){
    try{
        const res = await Student.findAndCountAll({
            attributes : ["id", "name", "Nob"]
        });
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
        return null;
    }
}
module.exports = {
    addStd,
    updateStd,
    deleteStd,
    login,
    getStdById,
    getDetailById,
    getAllStudent
}