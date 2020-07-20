// const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
// const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
const sequelize = require('./db');
const {DataTypes} = require("sequelize");
const Student = require('./Student');
const Course = require("./Course");
const Coursestudent = sequelize.define('CourseStudent', {
    CourseId: {
        type: DataTypes.INTEGER,
        references: {
            model: Course, // 'Movies' 也可以使用
            key: 'id'
        }
    },
    StudentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Student, // 'Actors' 也可以使用
            key: 'id'
        }
    }
},{
    createdAt : false,
    updatedAt : false
});

Course.belongsToMany(Student, { through: 'CourseStudent' });
Student.belongsToMany(Course, { through: 'CourseStudent' });
module.exports = Coursestudent;