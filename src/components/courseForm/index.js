import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Cascader,
    Select,
    Button,
    InputNumber,
    message
} from 'antd';
import {  updateCourse } from "../../services/courseSer";
const { Option } = Select;
const time = [
    {
        value: '08:30:00',
        label: '08:30'
    },
    {
        value: '10:25:00',
        label: '10:25'
    },
    {
        value: '13:50:00',
        label: '13:50'
    },
    {
        value: '15:45:00',
        label: '15:45'
    }
]
const timeAndWeek = [
    {
        value: '1',
        label: '周一',
        children: time
    },
    {
        value: '2',
        label: '周二',
        children: time
    },
    {
        value: '3',
        label: '周三',
        children: time
    },
    {
        value: '4',
        label: '周四',
        children: time
    },
    {
        value: '5',
        label: '周五',
        children: time
    },

];
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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 2,
        },
        md: {
            span: 10,
            offset: 4
        }
    },
};

const building = [
    "文新楼", "文清楼", "理学楼南楼", "理学楼北楼", "计算机实验楼"
]
/**
 * 
 * @param {*} props 
 * course当前的课程
 * onSetVisible关闭modal
 * reqCourse请求新的课程
 */
const AddCourse = (props) => {
    // console.log(props);
    // 解析props
    props.course.building = building.filter(item => {
        var a = props.course.place.search(item);
        return a != -1
    })[0];
    props.course.class = props.course.place.replace(props.course.building, "");
    const [form] = Form.useForm();

    const onFinish = async values => {
        // 去掉undefined
        if (typeof values.capacity != "number" || typeof values.score != "number") {
            message.error("课容量或学分必须为数字！", 1);
            return;
        }
        values.place = values.building + values.class;
        values.time = values.timeAndWeek[1];
        values.weekDay = values.timeAndWeek[0];
        values.id = props.course.id;
        let result = null;
        result = await updateCourse(values.id, values);
        if (result && result.data.msg === "success") {
            message.success("添加成功", 3);
        } else {
            message.error("添加失败", 3);
        }
        props.reqCourse();
        props.onSetVisible(false);
    };

    const prefixSelector = (
        <Form.Item name="building" noStyle>
            <Select
                style={{
                    width: 110,
                }}
            >
                {building.map(item => {
                    return (
                        <Option value={item}>{item}</Option>
                    )
                })}
            </Select>
        </Form.Item>
    );
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="course"
            onFinish={onFinish}
            initialValues={{
                building: props.course.building,
                capacity: props.course.capacity,
                score: props.course.score,
                class : props.course.class,
                name : props.course.name,
                timeAndWeek : [props.course.weekDay+"", props.course.time]
            }}
            scrollToFirstError
        >
            <Form.Item
                name="name"
                label={
                    <span>
                        课程名称&nbsp;
                    </span>
                }
            >
                <Input placeholder={props.course.name} />
            </Form.Item>

            <Form.Item
                name="timeAndWeek"
                label="上课时间"
            >
                <Cascader  options={timeAndWeek} />
            </Form.Item>

            <Form.Item
                name="class"
                label="上课地点"
                wrapperCol={{ span: 10 }}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                    placeholder="输入教室"
                />
            </Form.Item>


            <Form.Item
                name="capacity"
                label="课容量"
            >
                <InputNumber
                    min={1}
                    max={250}
                />
            </Form.Item>
            <Form.Item
                name="score"
                label="学分"
            >
                <InputNumber
                    min={1}
                    max={5}
                />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    更新课程
                </Button>
            </Form.Item>
        </Form>
    );
};
export default AddCourse;