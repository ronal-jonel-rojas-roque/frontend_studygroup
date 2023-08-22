/* import '../../common/styled-teacher.css'; */
import React, { useState } from 'react';
import UserDatosPerfil from '../../components/user-datos-perfil';
import UserCoursePerfil from '../../components/user-course-perfil';
import { Col, Row } from 'react-bootstrap';
import Header from '../../components/header-component';
import Footer from '../../components/footer';

function Perfil() {
    const [selectedOption, setSelectedOption] = useState('mis-datos');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <div>
            <Header />
            <div>
                {/* <div>
                    <div className="user-info">
                        <h3>Mis Datos</h3>
                        <p>Nombre: John Doe</p>
                        <p>Apellido: Doe</p>
                        <p>DNI: 12345678</p>
                    </div>
                    <div className="user-card">
                        <p>Estudiante</p>
                        <p>Clasico</p>
                    </div>
                    <div className="user-stats">
                        <h4>Mis Puntos</h4>
                        <p>123</p>
                        <p>Mis puntos disponibles</p>
                    </div>
                </div> */}
                <h2 className='header-perfil'>
                    <Row>
                        <Col xs={12}>
                            <h5>
                                <button onClick={() => handleOptionChange('mis-cursos')}>
                                    Mis cursos
                                </button>

                                <button onClick={() => handleOptionChange('mis-datos')}>
                                    Mis Datos
                                </button>
                            </h5>
                        </Col>
                    </Row>
                </h2>
                <div className='content-container'>
                    {selectedOption === 'mis-datos' && <UserDatosPerfil />}
                    {selectedOption === 'mis-cursos' && <UserCoursePerfil />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Perfil;
