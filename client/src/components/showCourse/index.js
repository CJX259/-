import React, { Component, useEffect, useState } from 'react'
import { getAllCourses, showStudent, delCourse } from "../../services/courseSer";
import { getTeacherById } from "../../services/teacherSer";
import { Table, Tag, Spin, Button, message, Space, Modal } from 'antd';
// import "./index.css";
import { deepClone } from "../../utils"
import CourseForm from '../courseForm';
const { Column, ColumnGroup } = Table;
// 还需要的api:
// 拿到已经选择该课程的人数  
// 拿到该课程的老师名字     √
// 拿到本学生是否已经选了该课  √


export default function ShowCourse(props) {
    const requestCourse = async () => {
        setIsLoading(true);
        const result = await getAllCourses();
        let courses = typeof result.data.data !="string" ? result.data.data : [];

        courses = courses.map(async (item) => {
            item.key = item.id;
            const res = await getTeacherById(item.TeacherId);
            const count = await showStudent(item.id);
            item.nowCount = typeof count.data.data !="string"  ? count.data.data.length : 0;
            item.teacherName = typeof res.data.data !="string" ? res.data.data.name : "";
            return item;
        })
        // });
        Promise.all(courses).then(res => {
            setCourses(res);
            setIsLoading(false);
        })
    }
    useEffect(() => {
        requestCourse();
        return () => {
            // cleanup
            console.log("组件销毁");
        }
    }, [])
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mVisible, setMVisible] = useState(false);
    const [current, setCurrent] = useState({});

    const handleOk = (values) => {
        
    }
    const handleCancel = () => {
        setMVisible(false);
    }
    const updateCourse = async (record) => {
        setMVisible(true);
        setCurrent(record);
    }
    const deleteCourse = async (record) => {
        let flag = window.confirm("确定删除吗?");
        if (!flag) {
            return null;
        }
        let result = await delCourse(record.id);
        console.log(result);
        if (typeof result.data.data !="string") {
            message.success('删除成功', 2);
        }
        else {
            message.error('删除出错', 2);
        }
        requestCourse();
    }
    return (
        <Spin spinning={isLoading}>
            <Table className="course_table" dataSource={courses} pagination={false}>
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
                <ColumnGroup
                    title="操作"
                    key="action"
                >
                    <Column
                        render={(record) => {
                            return (
                                <Button type="primary"
                                    onClick={() => updateCourse(record)}
                                >修改</Button>
                            )
                        }}
                    >
                    </Column>
                    <Column
                        render={(record) => {
                            return (
                                <Button danger type="primary" onClick={() => deleteCourse(record)}
                                >删除</Button>
                            )
                        }}
                    >
                    </Column>
                </ColumnGroup>
            </Table>
            <Modal
                bodyStyle={{ minHeight: 71.4 }}
                visible={mVisible}
                title="修改信息"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>关闭</Button>
                ]}
            >
                {mVisible &&
                    <CourseForm
                        course={current}
                        onSetVisible={setMVisible}
                        reqCourse={requestCourse}
                    ></CourseForm>
                }
            </Modal>
        </Spin>
    )
}
