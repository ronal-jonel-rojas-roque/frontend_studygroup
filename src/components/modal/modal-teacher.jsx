import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../common/styled-modal.css';
import ModalSelectPerfil from './Modal-Select-Perfil';
import ClickableImage from './ClickableImage';
import { IoIosImages } from "react-icons/io";
import EnlargedImageModal from '../imagen-grande';
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { BsGenderAmbiguous } from "react-icons/bs";

const ModalTeacher = ({
    modalShow,
    teacher,
    onClose,
    isCreating }) => {

    const bodyUrl = 'http://localhost:3001/user';
    const [data, setData] = useState([]);
    const [usernameModal, setUsernameModal] = useState('');
    const [passwordModal, setPasswordModal] = useState('');
    const [dniModal, setDniModal] = useState([]);
    const [nameModal, setNameModal] = useState('');
    const [appatModal, setAppatModal] = useState('');
    const [apmatModal, setApMatModal] = useState('');
    const [birthayModal, setBirthayModal] = useState('');
    const [sexoModal, setSexoModal] = useState('');
    const [imageModal, setImageModal] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const imageInputRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const ImageDefault = '../../user_perfil/iconos/icono-defaul-hombre.png';

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [showProfileImageModal, setShowProfileImageModal] = useState(false);

    const [showEnlargedModal, setShowEnlargedModal] = useState(false);

    const openEnlargedModal = () => {
        setShowEnlargedModal(true);
    };

    useEffect(() => {
        setIsModalOpen(modalShow);
        setShowProfileImageModal(false); // Asegurarse de que se cierre el modal de selección de imagen
        document.body.classList.toggle('modal-open', modalShow);
    }, [modalShow]);

    const getData = async () => {
        const result = await axios.get(bodyUrl);
        setData(result.data.data)
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (teacher) {
            if (isCreating) {
                setUsernameModal('');
                setPasswordModal('');
                setDniModal('');
                setNameModal('');
                setAppatModal('');
                setApMatModal('');
                setSexoModal('');
                setBirthayModal('');
                setImageModal('');
            } else {
                setUsernameModal(teacher.username);
                setPasswordModal(teacher.password);
                setDniModal(teacher.dni);
                setNameModal(teacher.name);
                setAppatModal(teacher.apepaterno);
                setApMatModal(teacher.apmaterno);
                setSexoModal(teacher.sexo);
                setBirthayModal(teacher.birthday);
                setImageModal(teacher.image);
            }
        }
    }, [teacher, isCreating]);
    const toggleShowOptions = () => {
        setShowOptions(!showOptions);
    };
    const onChangeModalUserName = (e) => {
        setUsernameModal(e.target.value);
    };

    const onChangeModalPassword = (e) => {
        setPasswordModal(e.target.value);
    };

    const onChangeModalDni = (e) => {
        setDniModal(e.target.value);
    }

    const onChangeModalName = (e) => {
        setNameModal(e.target.value);
    };

    const onChangeModalApPat = (e) => {
        setAppatModal(e.target.value);
    };

    const onChangeModalApMat = (e) => {
        setApMatModal(e.target.value);
    };

    const onChangeModalSexo = (e) => {
        setSexoModal(e.target.value);
    };

    const onChangeModalBirthday = (e) => {
        setBirthayModal(e.target.value);
    };

    const onChangeModalImage = (e) => {
        setImageModal(e.target.value);
    };
    const handleAddButtonClick = () => {
        setShowModal(true);
    };
    const onSave = async () => {
        try {
            if (isCreating) {
                if (!usernameModal || !passwordModal || !dniModal || !nameModal || !appatModal || !apmatModal || sexoModal || !birthayModal || !imageModal) {

                    alert('Por favor, completa todos los campos');
                    return;
                }
                const response = await axios.post(bodyUrl, {

                    username: usernameModal,
                    password: passwordModal,
                    dni: dniModal,
                    name: nameModal,
                    appaterno: appatModal,
                    apmaterno: apmatModal,
                    sexo: sexoModal,
                    birthayModal: birthayModal,
                    image: imageModal
                });
                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: `Usuario: ${nameModal} creado con éxito`,
                    }).then(() => {
                        window.location.reload();
                    });
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo crear el usuario',
                    });
                }
            } else {
                const response = await axios.put(`${bodyUrl}/${teacher.id}`, {
                    username: usernameModal,
                    password: passwordModal,
                    dni: dniModal,
                    name: nameModal,
                    appaterno: appatModal,
                    apmaterno: apmatModal,
                    sexo: sexoModal,
                    birthayModal: birthayModal,
                    image: imageModal
                });
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: `Usuario: ${nameModal} actualizado con éxito`,
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo actualizar el usuario',
                    });
                }
            }
        } catch (error) {
            // Mostrar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al guardar el usuario',
            });
            console.error(error);
        }
    }

    const onImageSelect = (image) => {
        setSelectedProfileImage(image);
        setShowProfileImageModal(false);
    };

    const onShowProfileImageModal = () => {
        setShowProfileImageModal(true);
    };

    const toggleEnlargedModal = () => {
        setShowEnlargedModal(!showEnlargedModal);
    };

    return (
        <>
            <Modal show={modalShow} onHide={onClose} size="md" dialogClassName="modal2">
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title>{isCreating ? 'Crear Usuario' : 'Editar Usuario'}</Modal.Title>
                    <div>
                        <ModalSelectPerfil
                            show={showProfileImageModal}
                            onHide={() => setShowProfileImageModal(false)}
                            onImageSelect={onImageSelect}
                            onClose={() => setShowProfileImageModal(false)} />
                    </div>

                </Modal.Header>
                <Modal.Body className={`modal2-content`}>

                    <div className="text-center mb-4">
                        <img
                            src={selectedProfileImage || ImageDefault}
                            alt="Foto de perfil"
                            className="rounded-circle custom-modal-image"
                            onClick={toggleShowOptions}
                        />
                        {showOptions && (
                            <div className="position-relative d-inline-flex flex-column">
                                <div className="d-flex flex-column">
                                    <ClickableImage onOpenEnlargedModal={openEnlargedModal} />
                                    <label className='btn-modal-t' onClick={onShowProfileImageModal}>
                                        <IoIosImages className='icon-modal-teacher-galery' />
                                    </label>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    ref={imageInputRef}
                                    onChange={onChangeModalImage}
                                />
                            </div>
                        )}
                    </div>
                    <div className="d-flex mt-4">
                        <Form.Group controlId="username" className="flex-grow-1 mr-2 custom-modal-input">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                value={usernameModal}
                                onChange={(e) => onChangeModalUserName(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="custom-modal-input">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwordModal}
                                onChange={(e) => onChangeModalPassword(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="d-flex mt-4">
                        <Form.Group controlId="dni" className="flex-grow-1 mr-2 custom-modal-input">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control
                                type="number"
                                value={dniModal}
                                onChange={(e) => onChangeModalDni(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="name" className="custom-modal-input">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={nameModal}
                                onChange={(e) => onChangeModalName(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="d-flex mt-4">
                        <Form.Group controlId="apPat" className="flex-grow-1 mr-2 custom-modal-input">
                            <Form.Label>Apellido Paterno</Form.Label>
                            <Form.Control
                                type="text"
                                value={appatModal}
                                onChange={(e) => onChangeModalApPat(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="apMat" className="custom-modal-input">
                            <Form.Label>Apellido Materno</Form.Label>
                            <Form.Control
                                type="text"
                                value={apmatModal}
                                onChange={(e) => onChangeModalApMat(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="d-flex mt-4">
                        <Form.Group controlId="sexo" className="flex-grow-1 mr-2 custom-modal-select">
                            <Form.Label>Género</Form.Label>
                            <Form.Select
                                value={sexoModal}
                                onChange={onChangeModalSexo}
                            >
                                <option value="">Selecciona un género</option>
                                <option value="Masculino">
                                    <BsGenderMale /> Masculino
                                </option>
                                <option value="Femenino">
                                    <BsGenderFemale /> Femenino
                                </option>
                                <option value="Otro">
                                    <BsGenderAmbiguous /> Otro
                                </option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="birthday" className="flex-grow-1 ml-2 custom-modal-input">
                            <Form.Label>Cumpleaños</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthayModal}
                                onChange={(e) => onChangeModalBirthday(e)}
                            />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer className='modal-footer-t'>
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                        {isCreating ? 'Guardar' : 'Actualizar'}
                    </Button>
                </Modal.Footer>
                <EnlargedImageModal
                    show={showEnlargedModal}
                    onHide={toggleEnlargedModal}
                    imageSrc={selectedProfileImage || ImageDefault}
                />
            </Modal >

        </>
    );
};

export default ModalTeacher;
