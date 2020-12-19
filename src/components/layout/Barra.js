import React, { useContext, useEffect } from 'react'
import authContext from '../../context/autenticacion/authContext'

export const Barra = () => {

     // extraer la informacion de autenticacion
     const autenticacionContext = useContext(authContext);
     const { usuarioAutenticado, usuario, cerrarSesion} = autenticacionContext;
 
     useEffect(() => {
        usuarioAutenticado();
     }, []);

    return (
        <div>
            <header
                className="proyectos__header"
            >
                {usuario 
                ? 
                    <div className="proyectos__user">
                    <i className="far fa-user mr-2"></i>
                    <p className="proyectos__nombre-header">Hola,{usuario.nombre}</p>
                </div>      
                : null
                }
               
                <button 
                    className="proyectos__btn-cerrarSesion"
                    onClick={ () => cerrarSesion()}
                >
                    Cerrar sesión
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </header>
        </div>
    )
}
