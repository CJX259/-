const {DataTypes} = require("sequelize");
const sequelize = require("./db");
const Teacher = sequelize.define("Teacher", {
    name : {
        type: DataTypes.STRING,
        allowNull : false
    },
    Nob : {
        type : DataTypes.STRING,
        unique: true,
        allowNull : false
    }  ,
    password: {
        type : DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt : false,
    updatedAt : false
});
module.exports = Teacher;