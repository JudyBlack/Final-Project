import React from "react";
import "./footer.scss"
import logo from './vdi-1.svg'
import { Link } from "react-router-dom";
import {FacebookOutlined, TwitterOutlined, InstagramOutlined} from '@ant-design/icons';
import { Space } from 'antd';
  

const Footer = () => {
    return (
        <div className="footer_container">
            <div className="first_part">
                <a href="/"><img src={logo} alt="pic is not found" /><span>FILM</span></a>
            </div>
            <div className="second_part">
                <div>
                    <span>Get more information and latest news through:</span>
                    <Space className="footer_icons">
                    <a href="https://www.facebook.com"><FacebookOutlined /></a>
                    <a href="https://www.twittter.com"><TwitterOutlined /></a>
                    <a href="https://www.instagram.com"><InstagramOutlined /></a>
                    </Space>
                </div>
                <p>Register to get the latest news about movies, tv series and actors!</p>
                <span>Haven't registered yet?  <a href="login">Click here</a> </span>    
            </div>
        </div>
    )
}

export default Footer;