const Course = require("../modules/Course");
const courses = [
    {
        name: "数学分析",
        time: "10:05:00",
        place: "理学楼南楼401",
        score: 4,
        capacity: 3,
        weekDay: 1,
        TeacherId: 1
    },
    {
        name: "数据结构",
        time: "08:30:00",
        place: "文新楼504",
        score: 2,
        capacity : 5,
        weekDay : 2,
        TeacherId : 2
    },
    {
        name : "程序设计语言I",
        time : "13:50:00",
        place: "计算机实验楼302",
        score : 1,
        capacity : 4,
        weekDay : 5,
        TeacherId : 3
    },
    {
        name : "数值计算方法",
        time : "15:30:00",
        place : "理学楼南楼108",
        score : 2,
        capacity : 6,
        weekDay : 3,
        TeacherId  : 4
    },
    {
        name : "计算机组成原理",
        time : "08:30:00",
        place : "文清楼605",
        score : 2,
        capacity : 5,
        weekDay : 1,
        TeacherId : 3
    },
    {
        name: "数学分析",
        time: "13:50:00",
        place: "理学楼南楼201",
        score: 4,
        capacity: 3,
        weekDay: 3,
        TeacherId: 1
    }
];
Course.bulkCreate(courses);