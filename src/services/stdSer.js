import axios from "axios";

export async function outStd(cid,sid){
    return await axios.get(`/api/course/outStudent?cid=${cid}&sid=${sid}`).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
export async function delStudent(sid){
    return await axios.get(`/api/std/delStd?sid=${sid}`).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
export async function getAllStudent(){
    return await axios.get("/api/std/getAllStudent").then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
export async function updateStudent(sid, sObj){
    return await axios.post(`/api/std/updateStd`, {
        sid : sid,
        ...sObj
    }).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
export async function addStd(sObj){
    return await axios.post(`/api/std/addStd`,{
        ...sObj
    }).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
        return err;
    })
}