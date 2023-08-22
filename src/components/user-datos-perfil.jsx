import React, { useState } from 'react';

const UserDatosPerfil = () => {

    return (
        <div className="user-datos-perfil">
            <div className="user-info">
                <h3>Mis Datos</h3>
                <p>Nombre: John Doe</p>
                <p>Apellido: Doe</p>
                <p>DNI: 12345678</p>
            </div>
            <div className="user-card">
                <p>Estudiante</p>
                <p>Clasico</p>
            </div>
            <div className="user-stats">
                <h4>Mis Puntos</h4>
                <p>123</p>
                <p>Mis puntos disponibles</p>
            </div>
        </div>
    );
};

export default UserDatosPerfil;

