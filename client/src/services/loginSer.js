import axios from "axios";
export async function login(Nob, password){
    return await axios.post("/api/user/login", {
        Nob : Nob,
        password : password
    }).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
export async function getDetailById(){
    return await axios.get("/api/user/loginByCookie").then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
export async function resetPassword(newPassword){
    return await axios.post("/api/user/resetPwd",{
        password : newPassword
    }).then(res=>{
        return res;
    }).catch(function (err){
        console.log(err);
    })
}
