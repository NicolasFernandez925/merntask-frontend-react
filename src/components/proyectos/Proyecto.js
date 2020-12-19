import React, {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContex';

export const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    // OBTENER LA FUNCION DEL CONTEXT de tarea
    const tareasContext = useContext(tareaContext);
    const {obtenerTarea} = tareasContext;

    // funcion para agregar el producto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); // fijar un proyecto actual
        obtenerTarea(id); // filtrar tareas cuando se da click
    }

    return (
        <li className="proyecto__li-item">
            <button
                type="button"
                className="proyecto__btn-proyecto"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    )
}
