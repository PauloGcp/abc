import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({to, label, icon}) => {
    return(
        <Link to={`/${to ? to : ''}`}><i className={`fa fa-${icon}`}></i> {label}</Link>
    )
}

export default NavItem