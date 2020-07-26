import axios from "axios";

export async function outStd(cid,sid){
    return await axios.get(`/api/course/outStudent?cid=${cid}&sid=${sid}`).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
