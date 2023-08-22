import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Table, Button } from "antd";
import "../../common/styled-dash.css";
import Header from "../../components/header-component";
import Avatar from "antd/es/avatar/avatar";
import { ImEyePlus } from "react-icons/im";
import Footer from "../../components/footer";

const { Title } = Typography;

const Dashboard = () => {

    const UrlCourse = "http://localhost:3001/courses";
    const UrlEst = "http://localhost:3001/user/students";
    const UrlDoc = "http://localhost:3001/user/teacher";
    const UrlClass = "http://localhost:3001/class";

    const [cursosData, setCursosData] = useState([]);
    const [docentesData, setDocentesData] = useState([]);
    const [numEstudiantes, setNumEstudiantes] = useState(0);
    const [numDocentes, setNumDocentes] = useState(0);
    const [numClass, setNumClass] = useState(0);

    const { Text } = Typography;

    const fetchCursosData = async () => {
        try {
            const response = await fetch(UrlCourse);
            const data = await response.json();
            setCursosData(data);
            setNumClass(data.count);
        } catch (error) {
            console.error("Error al obtener los datos de cursos:", error);
        }
    };
    const fetchDocentesData = async () => {
        try {
            const response = await fetch(UrlDoc);
            const data = await response.json();
            setNumDocentes(data.count);
            setDocentesData(data.data);
        } catch (error) {
            console.error("Error al obtener los datos de docente:", error);
        }
    };

    const fetchNumEstudiantes = async () => {
        try {
            const response = await fetch(UrlEst);
            const data = await response.json();
            setNumEstudiantes(data.count);
        } catch (error) {
            console.error("Error al obtener los datos de estudiantes:", error);
        }
    };

    /* const fetchClass = async () => {
        try {
            const response = await fetch(UrlClass);
            const data = await response.json();
            setNumClass(data.count);
        } catch (error) {
            console.error("Error al obtener los datos de Clases :", error);
        }
    }; */

    useEffect(() => {
        fetchCursosData();
        fetchDocentesData();
        fetchNumEstudiantes();
       /*  fetchClass(); */
    }, [])

    // Esta función convierte el objeto del docente en un objeto con las propiedades requeridas para la tabla
    const mapDocenteToTableData = (docente) => ({
        key: docente.user_id,
        image_url: docente.image_url,
        name: `${docente.name} ${docente.apellido_pat} ${docente.apellido_mat}`,
    });

    const limitedDocentesData = docentesData ? docentesData.slice(0, 7) : [];
    return (<>
        <div className="Contenedor-Princ">
            <Header />
            <div className="dashboard-container">
                <div className="cards-container">
                    <Row gutter={[16, 16]}>
                        <Col span={8} >
                            <Card className="Col-Card">
                                <Row align="middle" justify="space-between">
                                    <Col className="image-icon-est"></Col>
                                    <Col>
                                        <div>
                                            <Title level={4}>Estudiantes</Title>
                                            <p className="card-number">{numEstudiantes}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="Col-Card">
                                <Row align="middle" justify="space-between">
                                    <Col className="image-icon-doc">
                                    </Col>
                                    <Col>
                                        <div>
                                            <Title level={4}>Docentes</Title>
                                            <p className="card-number">{numDocentes}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="Col-Card">
                                <Row align="middle" justify="space-between">
                                    <Col className="image-icon-Class">
                                    </Col>
                                    <Col>
                                        <div>
                                            <Title level={4}>Cursos</Title>
                                            <p className="card-number">{numClass}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="table-container">
                    <Row gutter={[16, 16]} className="col-doc">
                        <Col span={12} className="table-cols">
                            <Card className="table-col1">
                                <Row align="middle" justify="space-between" className="table-row">
                                    <Col>
                                        <Title level={3}>Cursos</Title>
                                    </Col>
                                    <Col>
                                        <Button type="primary" href="/class">Ver todos los Cursos</Button>
                                    </Col>
                                </Row>
                                {cursosData.data && cursosData.data.length > 0 ? (
                                    <Table
                                        dataSource={cursosData.data} // Utiliza "cursosData.data" como la fuente de datos
                                        pagination={false}
                                        rowKey="course_id" // Utiliza "course_id" como la clave única de cada fila
                                        className="table-table"
                                    >
                                        <Table.Column title="ID" dataIndex="course_id" key="course_id" className="table-colum" /> {/* Usar "course_id" como dataIndex */}
                                        <Table.Column title="Nombre" dataIndex="name" key="name" className="table-colum" /> {/* Usar "name" como dataIndex */}
                                        <Table.Column
                                            title="Descripción"
                                            dataIndex="description"
                                            key="description"
                                            className="table-columna"
                                            render={(text) => <Text >{text}</Text>} />
                                        <Table.Column
                                            title="Acción"
                                            key="action"
                                            render={() => <Button type="link" className="table-buton"><ImEyePlus /> </Button>}
                                        />
                                    </Table>

                                ) : (
                                    <p>No hay datos de cursos disponibles.</p>
                                )}
                            </Card>
                        </Col>
                        <Col span={12} className="table-cols">
                            <Card className="table-col2">
                                <Row align="middle" justify="space-between" className="table-row">
                                    <Col>
                                        <Title level={3}>Docentes</Title>
                                    </Col>
                                    <Col>
                                        <Button type="primary" href="/teacher">Ver todos los Docente</Button>
                                    </Col>
                                </Row>
                                {limitedDocentesData && limitedDocentesData.length > 0 ? (
                                    <Table
                                        dataSource={limitedDocentesData.map(mapDocenteToTableData)}
                                        pagination={false}
                                        rowKey="key"
                                        className="table-table"
                                    >
                                        <Table.Column
                                            title="Imagen"
                                            dataIndex="image_url"
                                            key="image_url"
                                            render={(imagen) => <Avatar src={imagen} />}
                                        />
                                        <Table.Column title="Docente" dataIndex="name" key="name" className="table-colum" />
                                        <Table.Column
                                            title="Acción"
                                            key="action"
                                            render={() => <Button type="link"><ImEyePlus /></Button>}
                                        />
                                    </Table>
                                ) : (
                                    <p>No hay datos de docentes disponibles.</p>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>
        </div>
        <Footer />
    </>

    );
};

export default Dashboard;