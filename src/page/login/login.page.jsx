import React, { useRef, useState } from 'react';
import '../../common/styled-login.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FiUser } from "react-icons/fi";
import { AiFillLock, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Login = () => {
    const baseUrl = "http://localhost:3001/user";
    const [rememberMe, setRememberMe] = useState(false);
    const passwordInputRef = useRef(null);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    const [showPassword, setShowPassword] = useState({
        visible: false,
        icon: <AiFillEyeInvisible />
    });

    const [body, setBody] = useState({ username: '', password: '' })

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setBody({
            ...body,
            [name]: value
        });
    }

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };
    const handleShowPasswordToggle = () => {
        setShowPassword((prevState) => ({
            visible: !prevState.visible,
            icon: prevState.visible ? <AiFillEyeInvisible /> : <AiFillEye />
        }));
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit();
        }
    };
    //enviar los valores capturados por handleChange
    const onSubmit = async () => {
        const isUsernameEmpty = body.username.trim() === '';
        const isPasswordEmpty = body.password.trim() === '';

        if (isUsernameEmpty && isPasswordEmpty) {
            alert('Por favor, completa todos los campos');
            return;
        }
        if (isUsernameEmpty) {
            alert('Por favor, ingresa el nombre de usuario');
            return;
        }
        if (isPasswordEmpty) {
            alert('Por favor, ingresa la contraseña');
            return;
        }

        let isUsernameCorrect = false;
        let isPasswordCorrect = false;

        const enteredUsername = body.username ? body.username.trim().toLowerCase() : '';
        const enteredPassword = body.password.trim();

        try {
            const response = await axios.patch(`${baseUrl}/login`, body);
            const userData = response.data;

            if (userData && userData.data && (userData.data.username)) {
                const userDataUsername = userData.data.username ? userData.data.username.toLowerCase() : '';
                if (userDataUsername === enteredUsername) {
                    isUsernameCorrect = true;
                    if (userData.data.password === enteredPassword) {
                        isPasswordCorrect = true;
                    }
                }
            } else {
                console.log('No existen los valores');
            }

            if (isUsernameCorrect && isPasswordCorrect) {
                Cookies.set('userData', userData.data, { expires: 7 }); // Expira en 7 días
                setShowWelcomeModal(true);
                setTimeout(() => {
                    window.location.href = "../dashboard";
                }, 1000);
            } else if (!isUsernameCorrect && !isPasswordCorrect) {
                alert('El usuario y la contraseña no son correctos');
            } else if (!isUsernameCorrect) {
                alert('El usuario no es correcto');
            } else {
                alert('La contraseña no es correcta');
            }
        } catch (error) {
            setBody({ username: enteredUsername, password: enteredPassword }); // Actualizar el estado con los valores ingresados
            alert(`Ha ocurrido un error en la solicitud: ${error.message}`);
        }
    };
    return (
        <div className="containerPrincipal">
            <div className="loginContainer">
                <h2 className="title">Inicio de sesión</h2>
                <div className='cuerpo-login'>
                    <div className="input-div">
                        <div className="div">
                            <FiUser className='icon-login'></FiUser>
                            <input
                                type="text"
                                placeholder='Usuario'
                                className="form-control"
                                name="username"
                                value={body.username}
                                onChange={handleChange}
                                autoComplete={rememberMe ? "username" : "off"}
                            />
                        </div>
                    </div>
                    <div className="input-div">
                        <div className="div">
                            <AiFillLock className='icon-login'></AiFillLock>
                            <input
                                type={showPassword.visible ? "text" : "password"}
                                className="form-control"
                                name="password"
                                value={body.password}
                                onChange={handleChange}
                                placeholder="Password"
                                autoComplete={rememberMe ? "current-password" : "off"}
                                onKeyDown={handleKeyDown}
                            />
                            <span
                                className="show-password-button"
                                onClick={handleShowPasswordToggle}
                            >
                                {showPassword.icon}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="options">
                    <label className="remember-me">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                        <span>Recordarme</span>
                    </label>
                    <a href="#" className='span-login'>Olvide mi Contraseña?</a>
                </div>
                <button className="btnn btn-primary" onClick={onSubmit} >
                    Iniciar Sesión
                </button>
            </div>
            <Modal show={showWelcomeModal} onHide={() => setShowWelcomeModal(false)} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Bienvenido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{`Bienvenido ${body.username}`}</p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Login;