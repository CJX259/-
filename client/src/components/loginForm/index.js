import React, { Component } from 'react'
import { Form, Input, Button, Spin, message } from "antd";
import { login } from "../../services/loginSer";
import { withRouter } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./index.css";
class LoginForm extends Component {
    state = {
        isLoading: false
    }
    async sendLogin(Nob, password) {
        this.setState({
            isLoading: true
        });
        const resp = await login(Nob, password);
        if (typeof resp.data.data != "string") {
            await message.success("登录成功", 1);
            this.props.history.push("/index");
        } else {
            message.error(resp.data.data, 3);
        }
        this.setState({
            isLoading: false
        })
    }
    onFinish = values => {
        this.sendLogin(values.Nob, values.password);
    }
    render() {
        const FormConfig = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 16
            }
        }

        return (
            <Spin tip="登录中，请稍后..." spinning={this.state.isLoading}>
                <Form name="loginUser" {...FormConfig} className="login_form" onFinish={this.onFinish}>
                    <Form.Item
                        name="Nob"
                        rules={[{ required: true, message: 'Please input your number!' }]}
                        label="账号">
                        <Input prefix={<UserOutlined />} placeholder="userNumber" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        label="密码">
                        <Input type="password" prefix={<LockOutlined />} placeholder="password" />
                    </Form.Item>
                    <Form.Item wrapperCol={24} className="login_btn">
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }
}
export default withRouter(LoginForm);