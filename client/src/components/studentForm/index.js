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
        let result = await resetPassword(values.nPassword);
        if(typeof result.data.data !="string"){
            message.success("修改成功", 2);
        }else{
            message.error(result.data.data,2);
        }
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
                        rules={[{ required: true, message: '请输入新密码!' }]}
                        label="新密码">
                        <Input type="password" prefix={<LockOutlined />} placeholder="请输入新密码" />
                    </Form.Item>
                    <Form.Item
                        name="cPassword"
                        rules={[{ required: true, message: '请输出新密码!' }]}
                        label="确认密码">
                        <Input type="password" prefix={<LockOutlined />} placeholder="确认密码" />
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
