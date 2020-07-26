import { getTeacherCourse, getTeacherById } from "../../services/teacherSer";
import { showStudent, delCourse } from "../../services/courseSer";
import { outStd } from "../../services/stdSer";
import React, { useState, useEffect } from 'react'
import { Table, Spin, Button, message, Space, Tag, Modal } from 'antd';
import "./index.css";
const { Column, ColumnGroup } = Table;

function TeaCourse() {
    //当前老师的课程
    const [courses, setCourses] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [mLoading, setMLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    // 选了某课程的学生们
    const [studentsInACourse, setStudentsInACourse] = useState({ chooseStd: [], courseId: 0 });
    // 老师退掉的学生们
    const [outStdInACourse, setOutStdInACourse] = useState({ courseId: 0, outStd: [] });
    // const [ChooseStudent, setChooseStudent] = useState([]);
    //请求课程信息
    async function requestData() {
        setIsLoading(true);
        let result = await getTeacherCourse();
        result.data.data.rows = result.data.data.rows.map(async item => {
            // console.log(item);
            let chooseStd = await showStudent(item.id);
            item.chooseStd = chooseStd.data.data;
            // return chooseStd.data.data;
            return item;
        })
        Promise.all(result.data.data.rows).then(res => {
            setCourses(res);
            setIsLoading(false);
        })
    }
    const deleteCourse = async (record) => {
        let flag = window.confirm("确认删除该课程吗？");
        if (!flag) {
            return;
        }
        let result = "";
        result = await delCourse(record.id);
        if (result.data.code == "403") {
            message.error(result.data.msg, 3);
        } else if (result.data.msg == "success") {
            message.success("删除成功", 2);
        } else {
            message.error("删除失败", 3);
        }
        // 刷新一下课程信息
        requestData()
    }
    function detail(record) {
        let stdAndCourse = {
            courseId: record.id,
            chooseStd: record.chooseStd
        }
        setStudentsInACourse(stdAndCourse);
        setVisible(true);
    }
    function handleOk() {
        setMLoading(true);
        // 没有选到人
        if(outStdInACourse.outStd.length == 0){
            handleCancel();
            setMLoading(false);
            return ;
        }
        // 对outStd里的所有学生进行删除
        let flag = window.confirm("确定删除这些学生吗?");
        if (!flag) {
            return;
        }
        let result = "";
        result = outStdInACourse.outStd.map(async std => {
            return await outStd(outStdInACourse.courseId, std);
        })
        Promise.all(result).then(res => {
            if (res[0].data.msg === "success") {
                message.success("删除成功", 2);
            } else {
                message.error("操作失败", 2);
            }
            setMLoading(false);
            setVisible(false);
        })
        // 刷新外面学生人数
        requestData();
    }
    function handleCancel() {
        //把选择到的学生取消掉
        let outStd = [];
        setOutStdInACourse({ courseId: studentsInACourse.courseId, outStd: outStd });
        // 重置当前的course和该course的学生
        let stdAndCourse = {
            courseId: 0,
            chooseStd: []
        }
        setStudentsInACourse(stdAndCourse);
        setVisible(false);
    }
    async function outStudent(std) {
        // 每点击一个，就放进outStd这个状态里
        let outStd = [];
        outStd.push(std.id);
        let newObj = {
            courseId: studentsInACourse.courseId,
            outStd: outStd
        };
        setOutStdInACourse(newObj);
    }
    useEffect(() => {
        requestData();
    }, [])
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
                            <Space>
                                {record.chooseStd.length}/{record.capacity}
                                {record.chooseStd.length == record.capacity ? <Tag color="red">已满</Tag> : ""}
                            </Space>
                        )
                    }}
                />
                <ColumnGroup title="操作">
                    <Column
                        className="action_btn"
                        key="detail"
                        render={(record) => {
                            return (
                                <>
                                    <Button
                                        onClick={() => {
                                            detail(record)
                                        }}
                                        type="primary"
                                    >详细
                                </Button>
                                    <Modal
                                        bodyStyle={{ minHeight: 71.4 }}
                                        visible={visible}
                                        title="已选学生"
                                        onOk={handleOk}
                                        onCancel={handleCancel}

                                        footer={[
                                            <Button key="back" onClick={handleCancel}>取消</Button>,
                                            <Button key="submit" type="primary" loading={mLoading} onClick={handleOk}>提交
                                            </Button>,
                                        ]}
                                    >
                                        {studentsInACourse.chooseStd.map(std => {
                                            console.log(std);
                                            return (
                                                <Tag color="red" closable onClose={() => outStudent(std)}>
                                                    {std.name}
                                                </Tag>
                                            )
                                        })}
                                    </Modal>
                                </>
                            )
                        }}
                    />
                    <Column
                        className="action_btn"
                        key="delete"
                        render={(record) => {
                            return (
                                <Button
                                    onClick={() => {
                                        deleteCourse(record)
                                    }}
                                    type="primary"
                                    danger
                                >删除
                                </Button>

                            )
                        }}
                    />
                </ColumnGroup>

            </Table>
        </Spin>
    )
}

export default TeaCourse