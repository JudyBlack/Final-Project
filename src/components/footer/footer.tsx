import React from "react";
import "./footer.scss";
import Logo from "./vdi-1.svg";
import { Link } from "react-router-dom";


import {
    FacebookFilled,
    InstagramFilled,
    TwitterCircleFilled,
    YoutubeFilled,
} from "@ant-design/icons";

const Footer = () => {
    return (
        <div className="footer_container">
            <div className="footer_wrapper">
                {/* Left: Logo & About */}
                <div className="footer_column">
                    <img src={Logo} alt="Logo" className="footer_logo" />
                    <p className="footer_about">
                        VDI Film – Your daily destination for the latest in cinema,
                        reviews, and more.
                    </p>
                </div>

                {/* Center: Links */}
                <div className="footer_column">
                    <h4>Quick Links</h4>
                    <div className="footer_column">
    <ul>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/tvshows">TV Shows</Link></li>
        <li><Link to="/top-rated">Top Rated</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
    </ul>
</div>

                </div>

                {/* Right: Socials */}
                <div className="footer_column">
                    <h4>Follow Us</h4>
                    <div className="footer_socials">
                        <a href="#"><FacebookFilled /></a> 
                        <a href="#"><InstagramFilled /></a>
                        <a href="#"><TwitterCircleFilled /></a>
                        <a href="#"><YoutubeFilled /></a>
                    </div>
                    <p className="footer_note">© 2025 VDI Film. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
