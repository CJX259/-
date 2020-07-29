const { Op } = require("sequelize");
const Admin = require("../modules/Admin");
const md5 = require("md5");

async function addAdmin(Nob, pwd) {
    if (arguments.length !== 2) {
        // console.log("数据有误");
        return null;
    }
    pwd = md5(pwd);
    try {
        const resp = await Admin.create({ Nob: Nob, password: pwd });
        // console.log("管理员创建成功");
        return resp.toJSON();
    }
    catch (err) {
        // return err;
        console.log(err);
        return null;
    }
}

async function updateAdmin(id, adminObj) {
    if (typeof adminObj != "object") {
        // console.log("传入管理员数据有误");
        return null;
    }
    adminObj.password = adminObj.password ? md5(adminObj.password) : undefined;
    try {
        const resp = await Admin.update(adminObj, {
            where: {
                id: id
            }
        });
        // console.log("管理员更新成功");
        return resp;
    } catch (err) {
        console.log(err);
        return null;
    }

}
async function deleteAdmin(id) {
    try {
        const resp = await Admin.destroy({
            where: {
                id: id
            }
        });
        return resp;
    } catch (e) {
        console.log(err);
        return null;
    }

}
async function login(Nob, pwd) {
    pwd = md5(pwd);
    try {
        const res = await Admin.findOne({
            where: {
                [Op.and]: [
                    { Nob: Nob },
                    { password: pwd }
                ]
            },
            attributes: ["id", "Nob"]
        });
        return JSON.parse(JSON.stringify(res));
    } catch (e) {
        console.log(err);
        return null;
    }
}
async function getDetailById(id) {
    try {
        const res = await Admin.findByPk(id,
            {
                attributes: ["id", "Nob"]
            });
        return JSON.parse(JSON.stringify(res));
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    addAdmin,
    updateAdmin,
    deleteAdmin,
    login,
    getDetailById
}