import React from 'react'
import "./index.css"
import { Form, Input, Button, message } from "antd";
import { updateTeacher } from "../../services/teacherSer";
import { updateStudent } from "../../services/stdSer";
/**
 * props : user为点击的用户信息，controlJob为该用户是教师还是学生
 * onSetVisible关闭modal
 * reqStd  reqTea请求所有学生/教师
 */
export default function UserForm(props) {
    const onFinish = async (values) => {
        //不把id放在form里了
        // values.id = props.user.id;
        let newValues = {};
        for (const k in values) {
            // console.log(typeof values.k);
            if (typeof values[k] != "undefined") {
                newValues[k] = values[k];
            }
        }
        // 使用newValues，去除了undefined的内容
        let result = null;
        if (props.user.controlJob === "teacher") {
            // 修改老师
            result = await updateTeacher(newValues.id, newValues);
        } else if (props.user.controlJob === "student") {
            //修改学生
            result = await updateStudent(newValues.id, newValues);

        } else {
            message.error("更新操作出错", 3);
        }
        if (typeof result.data.data !="string") {
            message.success("更新成功", 1);
            // 重新发送请求
            if(props.user.controlJob === "teacher"){
                props.reqTea();
            }else if(props.user.controlJob === "student"){
                props.reqStd();
            }
            props.onSetVisible(false);
        }
    }
    const FormConfig = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 16
        }
    }
    const [form] = Form.useForm();

    return (
        <Form 
        form={form}
        initialValues={{
            id:props.user.id,
            Nob : props.user.Nob,
            name : props.user.name
        }}
        name="updateUser" 
        {...FormConfig} 
        className="update_form" 
        onFinish={onFinish}>
            <Form.Item
                name="id"
                label="Id">
                <Input type="number" disabled={true}/>
            </Form.Item>
            <Form.Item
                name="Nob"
                label={props.user.controlJob === "teacher" ? "工号" : "学号"}>
                <Input type="text" disabled={true} />
            </Form.Item>
            <Form.Item
                name="name"
                label="姓名">
                    {/* <input type="text" name="name" placeholder={props.user.name}></input> */}
                <Input type="text"/>
            </Form.Item>
            <Form.Item
                name="password"
                label="密码">
                <Input type="password" placeholder="需要修改密码？" />
            </Form.Item>
            <Form.Item wrapperCol={12} className="update_form">
                <Button type="primary" style={{ float: "right", marginRight: 40 }} htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}
