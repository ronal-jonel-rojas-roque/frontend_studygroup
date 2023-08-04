import { useEffect, useMemo, useState } from 'react';
import '../../common/styled-class.css';
import Header from "../../components/header-component";
import Footer from '../../components/footer';
import { useTable, useSortBy, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import SearchIcon from '../../assets/search.png';

function Class() {
    const Url = 'http://localhost:3001/courses';
    const [courseData, setCourseData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const theme = createTheme({
        palette: {
            primary: {
                main: '#007bff',
            },
            secondary: {
                main: '#4CAF50',
            },
        },
    });

    const fetchCourseData = async () => {
        try {
            const response = await fetch(Url);
            const data = await response.json();
            setCourseData(data.data);
        } catch (error) {
            console.error("Error al obtener los datos de los cursos:", error);
        }
    }

    useEffect(() => {
        fetchCourseData();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'N°',
                accessor: (row, index) => index + 1,
            },
            {
                Header: 'Nombre',
                accessor: 'name',
            },
            {
                Header: 'Inscribirse al curso',
                Cell: ({ row }) => <Button variant='contained' className='enroll-button'>Inscribirse</Button>,
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
        previousPage,
        canPreviousPage,
        nextPage,
        canNextPage,
        pageOptions,
        pageIndex,
    } = useTable(
        { columns, data: courseData, initialState: { pageSize: 5 } },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter } = state;
    const setGlobalFilterDebounced = useAsyncDebounce(setGlobalFilter, 200);

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchButtonClick = () => {
        setGlobalFilterDebounced(searchValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className='page-class'>
                <Header />
                <div className='title'>
                    <h1 className='h1-title'>Cursos</h1>
                </div>
                <div className='search-pagination-container'>
                    <div className='search'>
                        <TextField
                            label='Buscar curso...'
                            variant='outlined'
                            value={searchValue}
                            onChange={handleSearchInputChange}
                        />
                        <Button
                            onClick={handleSearchButtonClick}
                            startIcon={<img src={SearchIcon} alt='search-icon' style={{ width: '30px', height: '40px', marginLeft: '10px' }} />}
                        >
                        </Button>
                    </div>
                </div>
                <div className='table-container'>
                    <table className='course-table' {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                            {page.length === 0 && (
                                <td colSpan="3" className="no-data-message">
                                    No hay cursos con este nombre
                                </td>
                            )}
                        </tbody>

                    </table>

                </div>
                <div className='search-pagination-container'>
                    <div className='pagination'>
                        <Button variant='contained' onClick={() => previousPage()} disabled={!canPreviousPage}>
                            Anterior
                        </Button>
                        <span>
                            Página{' '}
                            <strong>
                                {isNaN(pageIndex) ? 1 : pageIndex + 1} de {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <Button variant='contained' onClick={() => nextPage()} disabled={!canNextPage}>
                            Siguiente
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        </ThemeProvider>
    );
}
export default Class;
