import React from "react";
import './NavItem.css'
import { NavLink } from "react-router-dom";

const NavItem = ({ icon, path, text }) => {
    return(
        <li className="navItem-container">
            <NavLink className='' to={path}>
                <img src={icon} alt={`ir a ${text}`} />
                <h2 className="">{text}</h2>
            </NavLink>
        </li>
    )
}

export default NavItem