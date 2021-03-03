import React, { useEffect } from 'react'
import { LockOutlined, UserOutlined,FieldNumberOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom"
import { addStd } from "../../services/stdSer";
import { addTea } from "../../services/teacherSer";
import { Form, Input, Button, message } from "antd"
function AddUser(props) {
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 8,
            },
            sm: {
                span: 5,
            },
            md: {
                span: 4
            }
        },
        wrapperCol: {
            xs: {
                span: 16,
            },
            sm: {
                span: 14,
            },
            md: {
                span: 6
            }
        },
    };
    const onFinish = async (values) => {
        if(values.password.length <=5 ){
            message.error("密码长度最小为6位",4);
            return null;
        }
        if (values.password !== values.cPassword) {
            message.error("前后密码不一致", 3);
            return null;
        }
        let result = null;
        let localJob = window.localStorage.getItem("controlJob");
        if (localJob === "teacher") {
            if(values.Nob[0] !=='t'){
                message.error("教师序号首字母为t",4);
                return null;
            }
            //添加教师
            result = await addTea(values);
        } else if (localJob === "student") {
            if(values.Nob[0] !== "1"){
                message.error("学生序号为1开头",4);
                return null;
            }
            //添加学生
            result = await addStd(values);
        } else {
            message.error("识别信息出错", 3);
        }
        if(result.data.data && typeof result.data.data != "string"){
            message.success("添加成功",1);
        }else{
            message.error("序号不可重复",4);
        }
    }
    useEffect(() => {
        window.localStorage.setItem("controlJob", props.location.state);
        return () => {
            // 离开的时候会触发  刷新不会触发,也就是说刷新后依然有，不会被删掉
            window.localStorage.removeItem("controlJob");
        }
    }, [props.location.pathname])
    return (
        <Form name="addUser" {...formItemLayout} className="addUser_form" onFinish={onFinish}>
            <Form.Item
                name="Nob"
                rules={[
                    {
                        required: true,
                        message: '请输入序号'
                    },
                ]}
                label="序号">
                <Input type="text"  
                prefix={<FieldNumberOutlined />} 
                placeholder={`请输入序号`} />
            </Form.Item>
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: '请输入姓名'
                    },
                ]}
                label="姓名">
                <Input type="text"  prefix={<UserOutlined />} placeholder={"请输入姓名"} />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码'
                    },
                ]}
                label="密码">
                <Input type="password" prefix={<LockOutlined />} placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
                name="cPassword"
                rules={[
                    {
                        required: true,
                        message: '请确认密码'
                    },
                ]}
                label="确认密码">
                <Input type="password" prefix={<LockOutlined />} placeholder="请确认密码" />
            </Form.Item>
            <Form.Item className="addUser_form" wrapperCol={{ span: 14 }} style={{ textAlign: "center" }} >
                <Button type="primary" htmlType="reset">
                    重置
                </Button>
                <Button style={{ marginLeft: 20 }} type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}
export default withRouter(AddUser);