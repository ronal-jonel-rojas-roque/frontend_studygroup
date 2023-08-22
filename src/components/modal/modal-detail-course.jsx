import React, { useEffect, useRef, useState } from "react";
import Modal from '@mui/material/Modal';
import { Button } from "antd";
import { AiFillCloseCircle } from "react-icons/ai";
import '../../common/styled-modal.css';

const ModalDetailCourse = ({ course, onClose }) => {
    const urldata = 'http://localhost:3001/class';
    const urlTandC = 'http://localhost:3001/teacherincourses';
    const urlSandC = 'http://localhost:3001/studentincourses';
    const urlUser = 'http://localhost:3001/user';

    const [classData, setClassData] = useState([]);
    const [dataTandC, setDataTandC] = useState([]);
    const [dataSandC, setDataSandC] = useState([]);
    /* 
      const fetchClassData = async () => {
          try {
              const response = await fetch(urldata);
              const data = await response.json();
              setClassData(data);
              console.log(`Clases`,data)
          } catch (error) {
              console.error("Error al obtener los datos de la clase:", error);
          }
      };
  
      const fetchTandCData = async () => {
          try {
              const response = await fetch(urlTandC);
              const data = await response.json();
              setDataTandC(data);
              console.log(`Docentes`,data)
          } catch (error) {
              console.error("Error al obtener los datos de los docentes:", error);
          }
      };
      const fetchSandCData = async () => {
          try {
              const response = await fetch(urlSandC);
              const data = await response.json();
              setDataSandC(data);
              console.log(`Estudiantes`,data)
          } catch (error) {
              console.error("Error al obtener los datos de los alumnos:", error);
          }
      };
      
      const fetchUser = async () => {
          try {
              const response = await fetch(urlUser);
              const data = await response.json();
              setDataSandC(data);
              console.log(`User`,data)
              console.log(`Cursos`, course)
          } catch (error) {
              console.error("Error al obtener los datos de los estudiantes:", error);
          }
      };
  
      useEffect(() => {
          fetchClassData();
          fetchTandCData();
          fetchSandCData();
          fetchUser();
      }, [])
     */
    const schedule = classData.find(classItem => classItem.schedule_id === course.schedule_id);
    const teacherInCourse = dataTandC.find(item => item.course_id === course.course_id);
    const studentsInCourse = dataSandC.filter(item => item.course_id === course.course_id);

    return (
        <Modal open={true} onClose={onClose} sx={{ backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="modal-detail-course">
                <div className="card-container1">
                    <div className="card-header1">
                        <h2 >Detalles del Curso</h2>
                        <button onClick={onClose}>
                            <AiFillCloseCircle />
                        </button>
                    </div>
                    <div className="conteiner-modal">
                        <div className="card-row">
                            <p className="card-title">Nombre:</p>
                            <p className="card-content">{course.name}</p>
                        </div>
                        <div className="card-row">
                            <p className="card-title">Descripción:</p>
                            <p className="card-content">{course.description}</p>
                        </div>
                        <div className="card-row">
                            <p className="card-title">Docente:</p>
                            <p className="card-content">{teacherInCourse ? teacherInCourse.name : "Docente no disponible"}</p>
                        </div>
                        <div className="card-row">
                            <p className="card-title">Horario:</p>
                            <p className="card-content">{schedule ? schedule.name : "Horario no disponible"}</p>
                        </div>
                        <div className="card-row">
                            <p className="card-title">Inscritos:</p>
                            <p className="card-content">{studentsInCourse.length}</p>
                        </div>
                    </div>
                    <div className="button-container">
                        <Button>Inscribirse</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default ModalDetailCourse;