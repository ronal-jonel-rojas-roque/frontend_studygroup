import React from 'react';
import { FiEye } from "react-icons/fi";

const ClickableImage = ({ onOpenEnlargedModal }) => {

    return (
        <div>
            <a className='btn-modal-t' onClick={onOpenEnlargedModal}>
                <FiEye className='icon-modal-teacher-watch' />
            </a>
        </div>
    );
};

export default ClickableImage;
