import React, { Component } from 'react'
import Admin from "../adm";
import Student from "../std";
import Teacher from "../tea";
import { withRouter } from 'react-router-dom';
import { getDetailById } from "../../services/loginSer";
class index extends Component {
    constructor(props) {
        super(props);
        // this.props = props;
        this.cookie = document.cookie.split("=")[1];
        // this.userObj = props.history.location.state;
        //根据cookie来获得用户信息

    }
    componentDidMount() {
        if (!this.cookie) {
            alert("暂无权限！");
            this.props.history.push('/');
        }
        if (this.cookie) {
            //发送请求拿到已登录的用户信息
            getDetailById().then(res => {
                this.setState({
                    user: res.data.data
                })
            });
        }
    }

    state = {
        user: {}
    }
    render() {
        if (this.state.user && this.state.user.job === "admin") {
            return (
                <Admin userObj={this.state.user}></Admin>
            )
        } else if (this.state.user && this.state.user.job === "teacher") {
            return (
                <Teacher userObj={this.state.user}></Teacher>
            )
        } else if (this.state.user && this.state.user.job === "student") {
            return (
                <Student userObj={this.state.user}></Student>
            )
        } else {
            return (
                <h1>暂无权限</h1>
            )
        }

    }
}
export default withRouter(index);