import React, { useEffect, useState } from "react";
import "../../common/styled-contact.css";
import Header from "../../components/header-component";
import { ImLocation2, ImStopwatch } from "react-icons/im";
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import LocationModal from "../../components/modal/modal-location";


const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        description: "",
    });
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar el campo de correo electrónico antes de enviar
        if (!validateEmail(formData.email)) {
            alert("Por favor ingrese un correo electrónico válido.");
            return;
        }

        try {
            const response = await fetch("/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("El mensaje ha sido enviado correctamente.");
                // Restablecer el formulario después del envío exitoso
                setFormData({ name: "", email: "", description: "" });
            } else {
                alert("Hubo un error al enviar el mensaje. Intente nuevamente.");
            }
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            alert("Hubo un error al enviar el mensaje. Intente nuevamente.");
        }
    };

    const validateEmail = (email) => {
        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    return (
        <>
            <Header />
            <div className="contact-us-container">
                <div className="header-section" />
                <div className="content-section">
                    <div className="form-section">
                        <div className="rain-effect">
                            <h3 className="title-input">envianos un mensaje directo</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                className="input-text"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo"
                                className="input-text"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <textarea
                                name="description"
                                placeholder="Descripción"
                                className="input-text"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                            />
                            <button className="send-button" onClick={handleSubmit}>Enviar</button>
                        </div>
                    </div>
                    <div className="info-section">
                        <div>
                            <h2>Dirección</h2>
                            <p>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="icono-ub"
                                >
                                    <ImLocation2 onClick={handleShowModal} />
                                </a> Huánuco- Huánuco- Perú</p>
                        </div>
                        <div>
                            <h2>Teléfono</h2>
                            <p>
                                <a href="https://wa.me/51989505663" target="_blank" className="icono-wsp">
                                    <FaWhatsapp />
                                </a> +51 989505663</p>
                        </div>
                        <div>
                            <h2>Horario</h2>
                            <p><ImStopwatch /> Lunes - Viernes: 09:00 - 18:00</p>
                        </div>
                    </div>
                    <div className="modal-container">
                        <LocationModal modalShow={showModal} onClose={() => setShowModal(false)} />
                    </div>

                </div>

                <div className="social-icons-section">
                    <a href="https://discord.gg/u7vC7M8a" target="_blank" rel="noopener noreferrer" className="icono-disc">
                        <FaDiscord />
                    </a>
                    <a href="https://github.com/ronal-jonel-rojas-roque" target="_blank" rel="noopener noreferrer" className="icono-git">
                        <FaGithub />
                    </a>
                    <a href="https://www.facebook.com/RonalRojasRoqueJ" target="_blank" rel="noopener noreferrer" className="icono-fb">
                        <FaFacebook />
                    </a>
                    <a href="https://www.instagram.com/direct/t/ronalrojasroquej/" target="_blank" rel="noopener noreferrer" className="icono-ins">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com/in/ronal-rojas-a39772276" target="_blank" rel="noopener noreferrer" className="icono-lin">
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Contact;
