import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const ModalUser = ({ 
    modalShow, 
    user, 
    onClose, 
    isCreating }) => {

    const bodyUrl = 'http://localhost:3001/user';
    const [data, setData] = useState([])
    const [nameModal, setNameModal] = useState('');
    const [usernameModal, setUsernameModal] = useState('');
    const [emailModal, setEmailModal] = useState('');
    const [ageModal, setAgeModal] = useState('');
    const [phoneModal, setPhoneModal] = useState('');
    const [passwordModal, setPasswordModal] = useState('');

    const getData = async () => {
        const result = await axios.get(bodyUrl);
        setData(result.data.data)
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (user) {
            if (isCreating) {
                setNameModal('');
                setUsernameModal('');
                setEmailModal('');
                setAgeModal('');
                setPasswordModal('');
                setPhoneModal('');
            } else {
                setNameModal(user.name);
                setUsernameModal(user.username);
                setEmailModal(user.email);
                setAgeModal(user.age);
                setPasswordModal(user.password);
                setPhoneModal(user.phone);
            }
        }
    }, [user, isCreating]);

    const onChangeModalName = (e) => {
        setNameModal(e.target.value);
    };

    const onChangeModalUserName = (e) => {
        setUsernameModal(e.target.value);
    };

    const onChangeModalEmail = (e) => {
        setEmailModal(e.target.value);
    };

    const onChangeModalAge = (e) => {
        setAgeModal(e.target.value);
    };

    const onChangeModalPassword = (e) => {
        setPasswordModal(e.target.value);
    };
    const onChangeModalPhone = (e) => {
        setPhoneModal(e.target.value);
    };

    const onSave = async () => {
        try {
            if (isCreating) {
                if (!nameModal || !usernameModal || !emailModal || !ageModal || !phoneModal || !passwordModal) {
                    // Mostrar mensaje de error si algún campo está vacío
                    alert('Por favor, completa todos los campos');
                    return;
                }
                const response = await axios.post(bodyUrl, {

                    name: nameModal,
                    username: usernameModal,
                    email: emailModal,
                    age: ageModal,
                    phone: phoneModal,
                    password: passwordModal,
                });
                if (response.status === 201) {
                    // Mostrar mensaje de éxito
                    alert(`Usuario: ${nameModal} creado con éxito`);
                    // Cerrar el modal
                    window.location.reload();
                } else {
                    // Mostrar mensaje de error
                    alert('No se pudo crear el usuario');
                }
            } else {
                const response = await axios.put(`${bodyUrl}/${user.id}`, {
                    name: nameModal,
                    username: usernameModal,
                    email: emailModal,
                    age: ageModal,
                    phone: phoneModal,
                    password: passwordModal,
                });
                if (response.status === 200) {
                    // Mostrar mensaje de éxito
                    alert(`Usuario: ${nameModal} actualizado con éxito`);

                    // Cerrar el modal
                    window.location.reload();
                } else {
                    // Mostrar mensaje de error
                    alert('No se pudo actualizar el usuario');
                }
            }
        } catch (error) {
            // Mostrar mensaje de error
            alert('Hubo un error al guardar el usuario');
            console.error(error);
        }
    }


    return (
        <>
            <Modal show={modalShow} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {isCreating ? 'Crear Usuario' : 'Editar Usuario'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={nameModal}
                                onChange={(e) => onChangeModalName(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                value={usernameModal}
                                onChange={(e) => onChangeModalUserName(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                value={emailModal}
                                onChange={(e) => onChangeModalEmail(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="age">
                            <Form.Label>Edad</Form.Label>
                            <Form.Control
                                type="number"
                                value={ageModal}
                                onChange={(e) => onChangeModalAge(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                value={phoneModal}
                                onChange={(e) => onChangeModalPhone(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="text"
                                value={passwordModal}
                                onChange={(e) => onChangeModalPassword(e)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                        {isCreating ? 'Guardar' : 'Actualizar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;
