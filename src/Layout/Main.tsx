import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Shared/Navbar';
import Footer from './Shared/Footer';

const Main:React.FC = () => {
    return (
        <>
           <Navbar></Navbar>
           <Outlet></Outlet>
           <Footer></Footer>
        
        </>
    );
};

export default Main;