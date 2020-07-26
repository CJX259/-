import React, { Component } from 'react'
import "./index.css";
import { Table, Tag, Space } from 'antd';
import { getChooseCourse } from "../../services/courseSer";
import {getTeacherCourse} from "../../services/teacherSer";
import { deepClone } from '../../utils';
export default class courseTable extends Component {
  state = {
    isLoading: false,
    courses: [],
    data: [{
      key: '1',
      time: '08:30~10:05'
    },
    {
      key: '2',
      time: '10:25~12:00'
    },
    {
      key: '3',
      time: '13:50~15:25'
    },
    {
      key: '4',
      time: '15:45:17:20'
    }]
  }
  async componentDidMount() {
    this.setState({
      isLoading: true
    })
    console.log(this.props.location.state);
    let result = null;
    let courses = [];
    if (this.props.location.state.job == "teacher") {
      //teacher端的请求课表
      result = await getTeacherCourse();
      courses = result ? result.data.data.rows : [];
      console.log(courses);
    } else if (this.props.location.state.job == "student") {
      result = await getChooseCourse();
      courses = result ? result.data.data : [];
    }
    this.setState({
      courses: courses
    });
    const timeArray = ["08:30:00", "10:25:00", "13:50:00", "15:45:00"];
    for (let i = 0; i < courses.length; i++) {
      for (let j = 0; j < timeArray.length; j++) {
        if (courses[i].time == timeArray[j]) {
          // 可以放进第j+1个data数据中
          // 还需要判断加入到week1还是week5
          this.setState(prev => {
            let newData = deepClone(prev.data);
            newData[j][`week${courses[i].weekDay}`] = `${courses[i].name} (${courses[i].place})`;
          // newData[j][`week${courses[i].weekDay}`] = <div><span>{courses[i].name}</span><Tag>courses[i].place</Tag></div>
            return {
              data: newData,
              isLoading: false
            }
          })
        }
      }
    }
  }

  render() {
    const columns = [
      {
        title: '时间\\星期',
        dataIndex: "time",
        render: text => <span>{text}</span>,
      },
      {
        title: '星期一',
        dataIndex: 'week1',
      },
      {
        title: '星期二',
        dataIndex: 'week2',
      },
      {
        title: '星期三',
        dataIndex: 'week3',
      },
      {
        title: '星期四',
        dataIndex: 'week4',
      },
      {
        title: '星期五',
        dataIndex: 'week5',
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        bordered
        title={() => '课表'}
        loading={this.state.isLoading}
        pagination={false}
      />
    )
  }
}