import React, { useState } from "react";
import './header.scss'
import logo from './vdi-1.svg'
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchEngine from "../SearchEngine/SearchEngine";


const Header = () => {
    const a = useLocation()
    const [navbar, setNavbar] = useState(false)

    const changeBackground = () =>{
        if(window.scrollY >= 180){
            setNavbar(true)
        }else{
            setNavbar(false)
        }
        }
    window.addEventListener('scroll', changeBackground)


    const [movies, setMovies] = useState([])
   

    return (
        <div className={navbar ? "navbar_active" : "navbar"}>
            <div className="nav_logo_input_part">
                <div className="logo_part">
                    <img src={logo} alt="" />
                    <span>FILM</span>
                </div>
                <div className="nav_input_part">
                    <SearchEngine />
                </div>
            </div>
            <div className="nav_link_part">
                <Link to="/" className={a.pathname === '/' ? "active" : 'non-active'}>Home</Link>
                <Link to="moviePage" className={a.pathname === '/moviePage' ? "active" : 'non-active'}>Movies</Link>
                <Link to="tv_series" className={a.pathname === '/tv_series' ? "active" : 'non-active'}>TV Series</Link>
                <Link to="login" className={a.pathname === '/login' ? "active" : 'non-active'}>Login</Link>
            </div>  
        </div>

    )
}

export default Header