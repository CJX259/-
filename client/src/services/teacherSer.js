
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