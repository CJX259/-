import React, { Component } from 'react'
import "./index.css"
import { LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Spin, message } from "antd";
import { resetPassword } from "../../services/loginSer";
export default class StudentForm extends Component {
    componentDidMount() {
        this.setState({
            userObj: this.props.location.state
        })
    }
    state = {
        userObj: {},
        isLoading: false
    }
    onFinish = async (values) => {
        if (values.cPassword !== values.nPassword) {
            message.error("前后密码不一致", 3);
            return null;
        }
        await resetPassword(values.nPassword);
        message.success("修改成功", 2);
    }
    render() {
        const FormConfig = {
            labelCol: {
                span: 2
            },
            wrapperCol: {
                span: 5
            }
        }
        return (
            <Spin tip="修改中，请稍后..." spinning={this.state.isLoading}>
                <Form name="loginUser" {...FormConfig} className="resetPwd_form" onFinish={this.onFinish}>
                    <Form.Item
                        name="nPassword"
                        rules={[{ required: true, message: 'Please input your New Password!' }]}
                        label="新密码">
                        <Input type="password" prefix={<LockOutlined />} placeholder="New password" />
                    </Form.Item>
                    <Form.Item
                        name="cPassword"
                        rules={[{ required: true, message: 'Please input your New Password!' }]}
                        label="确认密码">
                        <Input type="password" prefix={<LockOutlined />} placeholder="conform new password" />
                    </Form.Item>
                    <Form.Item wrapperCol={24} className="resetPwd_btn">
                        <Button type="primary" htmlType="submit">
                            重置密码
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }
}
