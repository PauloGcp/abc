import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Logo from '../components/template/logo/Logo'
import Nav from '../components/template/nav/Nav'
import Footer from '../components/template/footer/Footer'
import Routes from './Routes'

const App =  props => {
    return(
        <BrowserRouter>
            <div className='app'>
                <Logo></Logo>
                <Nav></Nav>
                <Routes></Routes>                
                <Footer></Footer>
            </div>
        </BrowserRouter>
    )
}

export default App