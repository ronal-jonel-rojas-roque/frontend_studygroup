import { useEffect, useState } from 'react';
import NavBar from './navbar';

const Header = () => {


    return (
        <header className={`sidebar-header`}>
           <NavBar></NavBar>
        </header>
    );
};

export default Header;
