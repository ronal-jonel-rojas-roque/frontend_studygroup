import React from 'react';
import Modal from 'react-bootstrap/Modal';

const EnlargedImageModal = ({ show, onHide, imageSrc }) => {
    return (
        <Modal dialogClassName="modal2" show={show} onHide={onHide} centered>
            <Modal.Body className='enlarge-body'>
                <div className="enlarged-image-container">
                    <img src={imageSrc} className="enlarged-image" alt="Enlarged" />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EnlargedImageModal;
