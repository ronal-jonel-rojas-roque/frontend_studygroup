import { Link } from 'react-router-dom';
import '../../common/styled-teacher.css';
import { useEffect, useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import axios from 'axios';
import ModalTeacher from '../../components/modal/modal-teacher';
import Pagination from 'react-bootstrap/Pagination';
import Header from "../../components/header-component";
import Footer from '../../components/footer';

function Teacher() {
    const Urlteacher = 'http://localhost:3001/teacher';
    const [docentesData, setDocentesData] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pagination = 'http://localhost:3001/user/paginate?';
    const teacherPerPage = 10;
    const startIndex = (currentPage - 1) * teacherPerPage;
    const endIndex = currentPage * teacherPerPage;
    const [totalPages, setTotalPages] = useState(1);

    const getData = async () => {
        try {
            const result = await axios.get(`${pagination}limit=${teacherPerPage}&page=${currentPage}`);
            console.log("Respuesta de la API:", result.data);
            setData(result.data.data);
            const totalCount = result.data.count; // Obtener el total de usuarios desde la respuesta de la API
            const newTotalPages = Math.ceil(totalCount / teacherPerPage);
            setTotalPages(newTotalPages);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const fetchDocentesData = async () => {
        try {
            const response = await fetch(Urlteacher);
            const data = await response.json();
            /* console.log(data); */
            setDocentesData(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error al obtener los datos de docente:", error);
            setIsLoading(false);
        }
    };
    useEffect(() => {/* 
        console.log("Página actual:", currentPage); */
        fetchDocentesData();
    }, [currentPage]);

    const handleAddButtonClick = () => {
        setShowModal(true);
        setIsCreating(true);
    };

    const handlePageChange = (pageNumber) => {
        /* console.log("Página cambiada a", pageNumber); */
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className='page-teacher'>
            <Header />
            <h2 className='header-teacher'>
                <button className="add-button" onClick={handleAddButtonClick}>
                    <FiUserPlus className="add-icon" />
                </button>
                Nuestros nuevos docentes
            </h2>
            <div>
                <ModalTeacher
                className= "modal-root"
                modalShow={showModal}
                onClose={() => setShowModal(false)}
                user={isCreating ? {} : selectedUser}
                isCreating={isCreating}
            />
            </div>
            
            <div className='card-container'>
                {isLoading ? (
                    <p>Cargando datos...</p> // Mostramos un mensaje de carga mientras los datos se están cargando
                ) : docentesData.data && docentesData.data.length > 0 ? (
                    docentesData.data.slice(startIndex, endIndex).map((docente, index) => (
                        <div key={index} className='card'>
                            <div className='card-image'>
                                <img src={docente.user.image_url} alt={docente.user.name} />
                            </div>
                            <div className='card-content'>
                                <h3 className='h3-user'>{docente.user.name}</h3>
                                <p className='p-user'>{docente.user.apellido_pat} {docente.user.apellido_mat}</p>
                                <Link to={`/detail/${docente.user.user_id}`} className='ver-usuario-button'>Detalles </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay datos disponibles</p>
                )}
            </div>
            <div className='pagination'>
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {paginationItems}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
            <Footer />
        </div>
    );
}

export default Teacher;
