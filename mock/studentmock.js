const Mock = require('mockjs');
const Student = require('../modules/Student');
const result = Mock.mock({
    "datas|5" :[
        {
            "id|+1" : 1,
            name : "@cname",
            Nob: "18152000@id",
            password:"123123"
        }
    ]
}).datas;
Student.bulkCreate(result);