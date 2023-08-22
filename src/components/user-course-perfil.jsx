import React, { useState } from 'react';

const UserCoursePerfil = () => {
    const [cursosRealizados, setCursosRealizados] = useState(2);
    const totalCursos = 10;
    const porcentajeCompletado = (cursosRealizados / totalCursos) * 100;

    return (
        <div className="user-course-perfil">
            <h3>Mis Cursos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Curso 1</td>
                        <td>Descripción del Curso 1</td>
                        <td>
                            <button>Ver Detalles</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Curso 2</td>
                        <td>Descripción del Curso 2</td>
                        <td>
                            <button>Ver Detalles</button>
                        </td>
                    </tr>
                    {/* ... Agregar más cursos aquí */}
                </tbody>
            </table>
            <div className="course-progress">
                <div className="progress-circle" style={{ strokeDasharray: `${porcentajeCompletado} 100` }}></div>
                <div className="progress-text">
                    <p>+14 puntos</p>
                    <p>Serás estudiante Plata en el 2024</p>
                </div>
            </div>
        </div>
    );
};

export default UserCoursePerfil;
