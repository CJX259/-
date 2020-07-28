import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom"
import { Spin, Table, message, Button, Modal } from "antd";
import { getAllTeacher, delTeacher } from "../../services/teacherSer";
import { delStudent, getAllStudent } from "../../services/stdSer";
import UserForm from "../../components/userForm";
import "./index.css";
const { Column, ColumnGroup } = Table;
function ControlUser(props) {
    async function requestAllTeacher() {
        setIsLoading(true);
        let result = await getAllTeacher();
        setUser(result.data.data.rows);
        setIsLoading(false);
    }
    async function requestAllStudent() {
        setIsLoading(true);
        let result = await getAllStudent();
        setUser(result.data.data.rows);
        setIsLoading(false);
    }
    async function clickUpdateUser(record) {
        setVisible(true);
        setCurrentUser(record);
    }

    async function delUser(record) {
        let flag = window.confirm("确认删除该用户吗？");
        if (!flag) {
            return null;
        }
        let result = null;
        let localJob = window.localStorage.getItem("controlJob");
        if (localJob === "teacher") {
            //del教师
            result = await delTeacher(record.id);
        } else if (localJob === "student") {
            //del学生
            result = await delStudent(record.id);
        } else {
            message.error("识别查找信息出错", 3);
        }
        if (result) {
            message.success("删除成功！", 1);
            // 刷新内容
            localJob === "teacher" ? requestAllTeacher() : requestAllStudent();
        }
    }
    async function handleOk() {
        //记得重置  
    }
    function handleCancel() {
        setVisible(false);
        // 重置当前的user
        console.log("取消");
        setCurrentUser({});
    }
    // 查找的用户们
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    // 拿到所有的教师/学生
    useEffect(() => {
        window.localStorage.setItem("controlJob", props.location.state);
        let localJob = window.localStorage.getItem("controlJob");
        if (localJob === "teacher") {
            //管理教师
            requestAllTeacher();
        } else if (localJob === "student") {
            //管理学生
            requestAllStudent();
        } else {
            message.error("识别查找信息出错", 3);
        }
        return () => {
            // 离开的时候会触发  刷新不会触发,也就是说刷新后依然有，不会被删掉
            window.localStorage.removeItem("controlJob");
            setUser([]);
        }
    }, [props.location.pathname])
    return (
        <div>
            <Spin spinning={isLoading}>
                <Table className="course_table" dataSource={user} pagination={false}>
                    <Column title="Id" dataIndex="id" key="id" />
                    <Column title="性名" dataIndex="name" key="name" />
                    <Column
                        title={window.localStorage.getItem("controlJob") === "teacher" ? "工号" : "学号"}
                        dataIndex="Nob"
                        key="Nob" />
                    <ColumnGroup title="操作">
                        <Column
                            key="update"
                            render={(record) => {
                                return (
                                    <>
                                        <Button
                                            onClick={() => { clickUpdateUser(record) }}
                                            type="primary"
                                        >修改
                                        </Button>
                                    </>
                                )
                            }}
                        />
                        <Column
                            key="del"
                            render={(record) => {
                                return (
                                    <Button
                                        onClick={() => { delUser(record) }}
                                        type="primary"
                                        danger>删除
                                    </Button>
                                )
                            }}
                        />
                    </ColumnGroup>
                </Table>
                <Modal
                    bodyStyle={{ minHeight: 71.4 }}
                    visible={visible}
                    title="修改信息"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>关闭</Button>
                    ]}
                >
                    {/* 每次通过visible来重新渲染userForm，否则该组件不刷新 */}
                    {visible &&
                        <UserForm
                            onSetVisible={setVisible}
                            reqStd={requestAllStudent}
                            reqTea={requestAllTeacher}
                            user={{ ...currentUser, controlJob: window.localStorage.getItem("controlJob") }}></UserForm>
                    }
                    {/* {record.name} */}
                </Modal>

            </Spin>
        </div>
    )
}
export default withRouter(ControlUser);