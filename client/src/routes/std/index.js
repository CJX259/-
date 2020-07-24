import React, { Component } from 'react'
// import Layout from "../layout";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {
    DesktopOutlined,
    BankOutlined,
    UserOutlined,
} from '@ant-design/icons';
import "./index.css"
import StudentForm from "../../components/studentForm";
import ChooseCourse from "../../components/chooseCourse";
import CourseTable from '../../components/courseTable';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Student extends Component {
    state = {
        collapsed: false,
        selectedMenu: "主页",
        openKeys: ["sub1"],
        selectedKeys: ["1"],
        pathname: ["index", "update", "choose", "showcourse"],
        menuName: ["主页", "修改密码", "选课", "查看课表"]
    };
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    clickMenu = (e) => {
        this.setState({
            selectedMenu: e.item.node.innerText,
            selectedKeys: e.keyPath
        });
    }
    componentDidMount() {
        this.pathArray = this.props.location.pathname.split("/");
        this.currentPath = this.pathArray.length === 2 ? this.pathArray[1] : this.pathArray[2];
        this.setState({
            selectedKeys: [this.state.pathname.indexOf(this.currentPath) + 1 + ""],
            selectedMenu: this.state.menuName[this.state.pathname.indexOf(this.currentPath)]
        })
    }

    onOpenChange = (e) => {
        this.setState({
            openKeys: e
        })
    }
    logout = (e) => {
        // 删掉cookie
        let flag = window.confirm("确定退出登录吗?");
        if (flag) {
            document.cookie = "token=; expires=0";
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Header className="site-layout-background title_name" style={{ padding: 0 }}>学生端</Header>
                    <Menu
                        selectedKeys={this.state.selectedKeys}
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        theme="dark"
                        mode="inline">
                        <Menu.Item onClick={this.clickMenu} key="1" icon={<BankOutlined />}>
                            <Link to={{
                                pathname: "/index",
                                state: this.props.userObj
                            }}>
                                主页
                            </Link>
                        </Menu.Item>
                        <Menu.Item onClick={this.clickMenu} key="2" icon={<UserOutlined />}>
                            <Link to={{
                                pathname: "/index/update",
                                state: this.props.userObj
                            }}>
                                修改密码
                            </Link>
                        </Menu.Item>

                        <SubMenu key="sub1" icon={<DesktopOutlined />} title="课程">
                            <Menu.Item onClick={this.clickMenu} key="3"><Link to={{
                                pathname: "/index/choose",
                                state: this.props.userObj
                            }}>选课</Link></Menu.Item>
                            <Menu.Item onClick={this.clickMenu} key="4"><Link to={{
                                pathname: "/index/showcourse",
                                state: this.props.userObj
                            }}>查看课表</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <Button onClick={this.logout} className="logout_btn">退出登录</Button>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/* 根据路由信息来修改 */}
                            <Breadcrumb.Item>{this.props.userObj.name}</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.selectedMenu}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 600 }}>
                            <Switch>
                                <Route path="/index/update" component={StudentForm}></Route>
                                <Route path="/index/choose" component={ChooseCourse}></Route>
                                <Route path="/index/showcourse" component={CourseTable}></Route>
                                <div>
                                    欢迎来到广州大学选课系统
                                </div>
                            </Switch>

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default withRouter(Student);