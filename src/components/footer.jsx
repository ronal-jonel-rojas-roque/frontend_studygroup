import React from 'react';
import '../common/styled-footer.css';

import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <div className='footer'>
            <div className='footer-column'>
                <h3 className='column-title'>Dirección</h3>
                <div className='column-content'>
                    <p>Av. Jiron Ricardo Palma</p>
                    <p>Mz3 Lt14 Huánuco, Hco., Perú</p>
                </div>
            </div>
            <div className='footer-column'>
                <h3 className='column-title'>Contacto</h3>
                <div className='column-content'>
                    <p>Email: ronalrojasroquej@gmail.com</p>
                    <p>
                        <a href="https://wa.me/51989505663" target="_blank" className="icono-wsp">
                            <FaWhatsapp />
                        </a> +51 989505663
                    </p>
                </div>
            </div>
            <div className='footer-column'>
                <h3 className='column-title'>Síguenos</h3>
                <div className='column-content'>
                    <p href='#'>
                        <a href="https://www.facebook.com/RonalRojasRoqueJ" target="_blank" rel="noopener noreferrer" className='icono-fb'>
                            <FaFacebook />
                        </a>
                    </p>
                    <p href='#'>
                        <a href="https://www.instagram.com/direct/t/ronalrojasroquej/" target="_blank" rel="noopener noreferrer" className='icono-ins'>
                            <FaInstagram />
                        </a>
                    </p>
                    <p href='#'>
                        <a href="https://www.facebook.com/RonalRojasRoqueJ" target="_blank" rel="noopener noreferrer" className='icono-youtube'>
                            <FaYoutube />
                        </a>
                    </p>
                </div>
            </div>
            <div className='footer-t'>
                <div className='footer-text'>
                    <p>
                        <span>Política de privacidad</span>
                        <span>Términos y Condiciones</span>
                    </p>
                    <p>
                        <span>© 2035 Creado por Ronal Rojas Roque con NodeJs y ReactJs</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
