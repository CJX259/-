import React, { Component } from 'react'
import { getAllCourses, getChooseCourse, chooseCourseFromStd, outCourse, showStudent } from "../../services/courseSer";
import { getTeacherById } from "../../services/teacherSer";
import { Table, Tag, Spin, Button, message, Space } from 'antd';
import "./index.css";
import { deepClone } from "../../utils"
const { Column, ColumnGroup } = Table;
// 还需要的api:
// 拿到已经选择该课程的人数  
// 拿到该课程的老师名字     √
// 拿到本学生是否已经选了该课  √


export default class Course extends Component {
    async componentDidMount() {
        this.setState({
            isLoading: true
        })
        const result = await getAllCourses();
        const chooseCourse = await getChooseCourse();
        let courses = result ? result.data.data : [];
        let chooseCourses = chooseCourse ? chooseCourse.data.data.map(item => item.id) : [];
        chooseCourses = [...this.state.chooseCourses, ...chooseCourses];
        //修改一下courses的参数
        //1. id => key  √
        //2. TeacherId => TeacherName  √
        //2. capacity => ?/总量  
        this.setState({
            chooseCourses: chooseCourses
        }, () => {
            courses = courses.map(async (item) => {
                item.key = item.id;
                const res = await getTeacherById(item.TeacherId);
                const count = await showStudent(item.id);
                item.nowCount = count ? count.data.data.length : 0;
                item.teacherName = res ? res.data.data.name : "";
                item.isChoose = this.state.chooseCourses.indexOf(item.id) == -1 ? false : true
                return item;
                // 
            })
        });
        Promise.all(courses).then(res => {
            this.setState({
                courses: res,
                isLoading: false
            })
        })
        // console.log(this.state.chooseCourse);

        // console.log(this.props.location.state);
    }

    state = {
        courses: [],
        isLoading: false,
        chooseCourses: []
    }
    // 如果已经选了就退，如果没选就选
    controlChoose = async (e) => {
        if (e.isChoose) {
            // 退课
            const result = await outCourse(e.id);
            if (result && result.data.msg == 'success') {
                //退课成功
                this.setState(prev => {
                    let newChoose = prev.chooseCourses.filter(item => {
                        return item != e.id
                    });
                    let newCourses = deepClone(prev.courses);
                    newCourses = newCourses.map(item => {
                        item.isChoose = newChoose.indexOf(item.id) == -1 ? false : true;
                        if (item.id === e.id) {
                            item.nowCount--;
                            // const count = await showStudent(item.id);
                            // item.nowCount = count.data.data.length;
                        }
                        return item;
                    })
                    return {
                        chooseCourses: newChoose,
                        courses: newCourses
                    }
                })
            } else {
                message.error("退课失败", 2);
            }
        } else if (!e.isChoose) {
            // 选课
            if (e.nowCount == e.capacity) {
                message.error("课容量已满，请联系任课老师", 2);
                return null;
            }
            const result = await chooseCourseFromStd(e.id);
            if (result && result.data.msg == 'success') {
                //选课成功    setState调用了两次  是因为没有深度克隆的原因
                this.setState(prev => {
                    let newChoose = [...prev.chooseCourses, e.id];
                    // 需要深克隆才行
                    let newCourses = deepClone(prev.courses);
                    newCourses = newCourses.map(item => {
                        item.isChoose = newChoose.indexOf(item.id) == -1 ? false : true;
                        if (item.id === e.id) {
                            item.nowCount++;
                        }
                        return item;
                    })
                    return {
                        chooseCourses: newChoose,
                        courses: newCourses
                    }
                })
            } else {
                message.error("选课失败", 2);
            }
        }
    }
    render() {
        return (
            <Spin spinning={this.state.isLoading}>
                <Table className="course_table" dataSource={this.state.courses} pagination={false}>
                    <Column title="课程" dataIndex="name" key="name" />
                    <Column title="星期" dataIndex="weekDay" key="weekDay" />
                    <Column title="时间" dataIndex="time" key="time" />
                    <Column title="上课地点" dataIndex="place" key="address" />
                    <Column title="学分" dataIndex="score" key="score" />
                    <Column title="课容量" key="capacity"
                        render={(record) => {
                            return (
                                <Space>{record.nowCount}/{record.capacity}
                                    {record.nowCount == record.capacity ? <Tag color="red">已满</Tag> : ""}
                                </Space>
                            )
                        }}
                    />
                    <Column title="任课老师" dataIndex="teacherName" key="teacherName" />
                    <Column
                        title="操作"
                        key="action"
                        render={(record) => {
                            return (
                                <Button
                                    onClick={() => { this.controlChoose(record) }}
                                    type="primary"
                                    danger={record.isChoose}>
                                    {record.isChoose ? "退课" : "选课"}
                                </Button>
                            )
                        }}
                    />
                </Table>
            </Spin>
        )
    }
}
