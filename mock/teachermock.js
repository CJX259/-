const Teacher = require("../modules/Teacher");
const teachers = [
    {
        name : "冯永平",
        Nob : "t001",
        password : "123123"
    },
    {
        name : "钟育彬",
        Nob: "t002",
        password : "123123"
    },
    {
        name : "杨洁霞",
        Nob: "t003",
        password : "123123"
    },
    {
        name : "麦红",
        Nob : "t004",
        password:"123123"
    },
]
Teacher.bulkCreate(teachers);