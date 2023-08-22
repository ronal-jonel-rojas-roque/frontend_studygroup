import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FaFileImage } from "react-icons/fa6";
import { Button } from 'antd';

const ModalSelectPerfil = ({ show, onHide, onImageSelect, onClose }) => {
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedGender, setSelectedGender] = useState('hombre');
    const [selectedFile, setSelectedFile] = useState(null);

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

    const handleAddImage = () => {
        onImageSelect(selectedImage);
        onClose();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    return (
        <>
            <Modal dialogClassName="modal2" size="md" show={show} onHide={onHide} >
                <Modal.Header closeButton className='modal-titles'>
                    <Modal.Title>Selecciona tu foto de perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`modal-contents`}>
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
                                <h6 className='text'>Visualiación Previa</h6>
                                <label className="upload-avatar-label">
                                    {/* <div className="upload-avatar-icon-container" onClick={() => document.querySelector('input[type="file"]').click()}>
                                        
                                    <FaFileImage className="upload-avatar-icon" />
                                    </div> */}
                                    <img
                                        src={selectedImage || (selectedGender === 'hombre' ? ImageDefaultMen : ImageDefaultWoMen)}
                                        alt="Foto de perfil"
                                        className="rounded-circle custom-modal-img"
                                    />
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                </label>
                            </Col>
                            <Col xs={7}>
                                <h6 className='text'>Imágenes disponibles</h6>
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
                    <Button variant="secondary" onClick={onClose} className='button'>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleAddImage} className='button'>
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};


export default ModalSelectPerfil;
