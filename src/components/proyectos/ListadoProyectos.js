import React, { useContext, useEffect } from 'react'
import { Proyecto } from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext';

export const ListadoProyectos = () => {

    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;
    
    // Obtener proyecto cuando carga el componente
    useEffect(() => {     
        obtenerProyectos();
        // esLint-disable-next-line
    }, [])

    // revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay productos, comienza creando uno</p>;

    return (
        <ul
            className="proyectos__listado"
        >
            {
                proyectos.map( proyecto => (
                    <Proyecto 
                        key={proyecto._id}
                        proyecto={proyecto}
                    />
                ))
            }
           
        </ul>
    )
}
