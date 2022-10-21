import "./nav.css"
import React from "react"
import NavItem from './NavItem';

const Nav =  props =>{
    return (
        <aside className="menu-area">
            <nav className="menu">
                <NavItem label={'Inicio'} icon={'home'}></NavItem>
                <NavItem label={'Usuários'} icon={'users'} to={'users'}></NavItem>
            </nav>
        </aside>
    )
}

export default Nav