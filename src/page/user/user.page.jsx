import { Link } from 'react-router-dom';
import '../../common/styled-user.css';
import { useEffect, useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import axios from 'axios';
/* import ModalUser from '../../components/modal/modal-user'; */
/* import { random, shuffle } from 'lodash'; */
/* import image1 from '../../assets/img/1.png';
import image2 from '../../assets/img/2.png';
import image3 from '../../assets/img/3.png';
import image4 from '../../assets/img/4.png';
import image5 from '../../assets/img/5.png';
import image6 from '../../assets/img/6.png';
import image7 from '../../assets/img/7.png';
import image8 from '../../assets/img/8.png';
import image10 from '../../assets/img/10.png';
import image9 from '../../assets/img/9.png'; */
/* import Pagination from 'react-bootstrap/Pagination'; */

function User() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pagination = 'http://localhost:3001/user/paginate?';
    const usersPerPage = 10;
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = currentPage * usersPerPage;
    const [totalPages, setTotalPages] = useState(1);

    const getData = async () => {
        try {
            const result = await axios.get(`${pagination}limit=${usersPerPage}&page=${currentPage}`);
            console.log("Respuesta de la API:", result.data);
            setData(result.data.data);
            const totalCount = result.data.count; // Obtener el total de usuarios desde la respuesta de la API
            const newTotalPages = Math.ceil(totalCount / usersPerPage);
            setTotalPages(newTotalPages);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };
    useEffect(() => {
        console.log("Current page:", currentPage);
        getData();
    }, [currentPage]);

    const handleAddButtonClick = () => {
        setShowModal(true);
        setIsCreating(true); // Establece isCreating como true al agregar un nuevo usuario// Restablece selectedUser al agregar un nuevo usuario
    };

    const handlePageChange = (pageNumber) => {
        console.log("Page changed to", pageNumber);
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
    const getRandomImages = (count) => {
        const allImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,];
        const shuffledImages = shuffle(allImages);
        const topImages = shuffledImages.slice(0, count);
        const bottomImages = shuffledImages.slice(5, 2 * count);
        return { topImages, bottomImages };

    }

    const randomImages = getRandomImages(5);
    const randomImagesTop = shuffle(randomImages.topImages);
    const randomImagesBottom = shuffle(randomImages.bottomImages);

    return (
        <div className='page-user'>
            <h2 className='header-user'>
                <button className="add-button" onClick={handleAddButtonClick}>
                    <FiUserPlus className="add-icon" />
                </button>
                Nuestros nuevos usuarios
            </h2>
            <ModalUser
                modalShow={showModal}
                onClose={() => setShowModal(false)}
                user={isCreating ? {} : selectedUser}
                isCreating={isCreating}
            />
            <div className='card-container'>
                {data.length > 0 ? (
                    data.slice(startIndex, endIndex).map((usuario, index) => (
                        <div key={index} className='card'>
                            <div className='card-image'>
                                <img src={randomImagesTop[index % 5]} alt={usuario.name} />
                            </div>
                            <div className='card-content'>
                                <h3 className='h3-user'>{usuario.name}</h3>
                                <p className='p-user'>{usuario.age} años</p>
                                <Link to={`/detail/${usuario.id}`} className='ver-usuario-button'>Ver Usuario</Link>
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
        </div>
    );
}

export default User;
