
import axios from "axios";

export async function getAllCourses() {
    return await axios.get("/api/course/getAllCourses").then(res => {
        return res;
    }).catch(function (err) {
        console.log(err);
        return err;
    })
}
// 返回学生已选课程
export async function getChooseCourse() {
    return await axios.get("/api/std/showCourse").then(res => {
        return res;
    }).catch(function (err) {
        console.log(err);
        return err;
    })
}
// std端 选课
export async function chooseCourseFromStd(cid) {
    return await axios.get(`/api/std/chooseCourse?cid=${cid}`).then(res => {
        return res;
    }).catch(function (err) {
        console.log(err);
        return err;
    })
}
// std端 退课
export async function outCourse(cid) {
    return await axios.get(`/api/course/outStudent?cid=${cid}`).then(res => {
        return res;
    }).catch(function (err) {
        console.log(err);
        return err;
    })
}
//   拿到已经选择该课程的学生
export async function showStudent(cid) {
    return await axios.get(`/api/course/showStudent?cid=${cid}`).then(res => {
        return res;
    }).catch(function (err) {
        console.log(err);
        return err;
    })
}
// tea 
export async function addCourse(courseObj, tid) {
    console.log("addCourse");
    return await axios.post(`/api/course/addCourse${tid ? `?tid=${tid}` : ""}`,
        courseObj
    ).then(res => {
        return res;
    }).catch(function (err) {
        console.log(err);
        return err;
    })
}
export async function delCourse(cid) {
    return await axios.get(`/api/course/delCourse?cid=${cid}`).then(res => {
        return res;
    }).catch(function (err) {
        console.log(err);
        return err;
    })
}
export async function updateCourse(cid, cObj) {
    return await axios.post(`/api/course/updateCourse`,{
        cid : cid,
        ...cObj
    }).then(res => {
        return res;
    }).catch(function (err) {
        console.log(err);
        return err;
    })
}