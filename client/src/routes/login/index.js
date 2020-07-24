import React from 'react'
import "./index.css";
import LoginForm from "../../components/loginForm";
export default function index(props) {
    return (
        <div className="login">
            <div className="login_wrapper">
                <span>登录</span>
                <LoginForm></LoginForm>
            </div>
        </div>
    )
};