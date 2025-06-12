import React, { useState, useEffect } from "react";
import './header.scss';
import logo from './vdi-1.svg';
import { Link, useLocation } from "react-router-dom";
import SearchEngine from "../SearchEngine/SearchEngine";

const Header = () => {
    const a = useLocation();
    const [navbar, setNavbar] = useState(false);

    // Function to handle scroll event and change navbar background color
    const changeBackground = () => {
        if (window.scrollY >= 180) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground); // Listen to scroll event

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);

    return (
        <div className={navbar ? "navbar navbar_active" : "navbar"}>
            <div className="nav_logo_input_part">
                <div className="logo_part">
                    <Link to="/" className="logo-link">
                        <img src={logo} alt="Logo" className="logo" />
                        <span>FILM</span>
                    </Link>
                </div>
                <div className="nav_input_part">
                    <SearchEngine />
                </div>
            </div>
            <div className="nav_link_part">
                <Link to="/" className={a.pathname === '/' ? "active" : 'non-active'}>Home</Link>
                <Link to="/moviePage" className={a.pathname === '/moviePage' ? "active" : 'non-active'}>Movies</Link>
                <Link to="/tv_series" className={a.pathname === '/tv_series' ? "active" : 'non-active'}>TV Series</Link>
                <Link to="/login" className={a.pathname === '/login' ? "active" : 'non-active'}>Login</Link>
            </div>
        </div>
    );
};

export default Header;
