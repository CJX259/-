const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define("Admin", {
    Nob: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
})
module.exports = Admin;