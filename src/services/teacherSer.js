
import  axios from "axios";


export async function getTeacherById(tid){
    return await axios.get(`/api/teacher/getTeacherById?tid=${tid}`).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}

export async function getTeacherCourse(){
    return await axios.get(`/api/teacher/showCourse`).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
export async function getAllTeacher(){
    return await axios.get("/api/teacher/getAllTeacher").then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
export async function delTeacher(tid){
    return await axios.get(`/api/teacher/delTeacher?tid=${tid}`).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
export async function updateTeacher(tid, tObj){
    return await axios.post(`/api/teacher/updateTeacher`, {
        tid : tid,
        ...tObj
    }).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
export async function addTea(tObj){
    return await axios.post(`/api/teacher/addTeacher`,{
        ...tObj
    }).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
        return err;
    })
}