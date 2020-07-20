const sequelize = require("./db");
const {DataTypes} = require("sequelize");

const Course = sequelize.define("Course", {
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    weekDay: {
        type : DataTypes.INTEGER,
        allowNull :false
    },
    time : {
        type : DataTypes.TIME,
        allowNull : false
    },
    place : {
        type : DataTypes.STRING,
        allowNull: false
    },
    score : {
        type: DataTypes.INTEGER,
        allowNull : false
    },
    capacity : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
}, {
    createdAt : false,
    updatedAt : false
});
module.exports = Course;