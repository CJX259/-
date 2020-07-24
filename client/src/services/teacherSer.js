
import  axios from "axios";


export async function getTeacherById(tid){
    return await axios.get(`/api/teacher/getTeacherById?tid=${tid}`).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}