import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Button } from 'antd';

const ModalSelectPerfil = ({ show, onHide, onSelect, onClose }) => {
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedGender, setSelectedGender] = useState('hombre');

    const ImageDefaultMen = '../../user_perfil/iconos/icono-defaul-hombre.png';
    const ImageDefaultWoMen = '../../user_perfil/iconos/icono-defaul-mujer.png';

    const avataresHombre = getAvatares('hombre', 6);
    const avataresMujer = getAvatares('mujer', 5);

    function getAvatares(gender, count) {
        const avatares = [];
        for (let i = 1; i <= count; i++) {
            avatares.push(`../../user_perfil/iconos/icono_${gender}_${i}.png`);
        }
        return avatares;
    }
    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
        setSelectedImage('');
    };

    return (
        <Modal className='modal3' show={show} onHide={onHide}>
            <div className='contenedor-modal-select'>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona tu foto de perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col xs={12}>
                                <h5>
                                    <button className={`avatar-button ${selectedGender === 'hombre' ? 'active' : ''}`} onClick={() => handleGenderChange('hombre')}>
                                        Avatar Hombre
                                    </button>
                                    <button className={`avatar-button ${selectedGender === 'mujer' ? 'active' : ''}`} onClick={() => handleGenderChange('mujer')}>
                                        Avatar Mujer
                                    </button>
                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <h6>Abrir galería</h6>
                                <label className="upload-avatar-label">
                                    <img
                                        src={selectedImage || (selectedGender === 'hombre' ? ImageDefaultMen : ImageDefaultWoMen)}
                                        alt="Foto de perfil"
                                        className="rounded-circle custom-modal-image"
                                    />
                                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onSelect} />
                                    <span className="upload-avatar-icon" onClick={() => document.querySelector('input[type="file"]').click()}>
                                        {/* Agrega aquí tu icono para seleccionar archivos */}
                                    </span>
                                </label>
                            </Col>
                            <Col xs={7}>
                                <h6>Imágenes disponibles</h6>
                                <div className="avatar-scroll" style={{ height: '200px', overflowY: 'auto' }}>
                                    {selectedGender === 'hombre' ? (
                                        avataresHombre.map((avatar, index) => (
                                            <Image
                                                key={index}
                                                src={avatar}
                                                alt={`Avatar ${index + 1}`}
                                                rounded
                                                onClick={() => setSelectedImage(avatar)}
                                                className="avatar-thumbnail"
                                            />
                                        ))
                                    ) : (
                                        avataresMujer.map((avatar, index) => (
                                            <Image
                                                key={index}
                                                src={avatar}
                                                alt={`Avatar ${index + 1}`}
                                                rounded
                                                onClick={() => setSelectedImage(avatar)}
                                                className="avatar-thumbnail"
                                            />
                                        ))
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer className='modal-footer-t'>
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" >
                        Agregar
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
};


export default ModalSelectPerfil;
