import React, { useEffect, useState } from 'react';
import "../common/styled-navbar.css";
const NavBar = () => {
    const [active, setActive] = useState("menu");
    const [icon, setIcon] = useState("toggler");
    const [showProfileText, setShowProfileText] = useState(true);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 768) {
            setShowProfileText(false);
          } else {
            setShowProfileText(true);
          }
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize); 
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
      
    const navToggle = () => {
        if (active === "menu") {
            setActive("menu active");
        } else setActive("menu");

        // Icon Toggler
        if (icon === "toggler") {
            setIcon("toggler toggle");
        } else setIcon("toggler");
    };

    return (
        <div>
            <nav className="nav">
                <a href="/dashboard" className="link">
                    <img src="https://e7.pngegg.com/pngimages/513/842/png-clipart-meeting-computer-icons-business-study-material-text-logo.png" 
                    className="image" />
                </a>
                <ul className={active}>
                    <li className="item">
                        <a href="/dashboard" className="link">
                            Inicio
                        </a>
                    </li>
                    <li className="item">
                        <a href="/teacher" className="link">
                            Docentes
                        </a>
                    </li>
                    <li className="item">
                        <a href="/class" className="link">
                        Cursos
                        </a>
                    </li>
                    <li className="item">
                        <a href="/contact" className="link">
                            Contacto
                        </a>
                    </li>
                    <li className="item">
                        <a href="/perfil" className="link">
                            <img
                                src="https://e7.pngegg.com/pngimages/513/842/png-clipart-meeting-computer-icons-business-study-material-text-logo.png"
                                className="image-navbar" />
                        </a>
                        {showProfileText && <span className="profile-text">Mi Perfil</span>} {/* Mostrar el texto condicionalmente */}
                    </li>
                    <li className="item">
                        <a href="#" className="link">
                            Cerrar Sesión
                        </a>
                    </li>
                </ul>
                <div onClick={navToggle} className={icon}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
