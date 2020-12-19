import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContex';

export const Tarea = ( {tarea} ) => {

    // extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // extraer el proyecto

    const [proyectoActual] = proyecto;

    // obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTarea, actualizarTarea, guardarTareaActual } = tareasContext;

    // funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = id =>{
        eliminarTarea(id, proyectoActual._id);
        obtenerTarea( proyectoActual.id );
    }

    // funcion que modifica el estado de las tareas

    const cambiarEstado = tarea =>{
            if(tarea.estado){
                tarea.estado = false
            }
            else{
                tarea.estado = true
            }
            actualizarTarea(tarea);
    }

    // agrega una tarea acutal cuando el usuario desea editarla
    const seleccionarTarea = tarea =>{
        guardarTareaActual(tarea)
    }

    return (
        <li className="tarea__contenedor-tarea ">
            <p>{tarea.nombre}</p>
            <div className="tarea__contenedor-button">
                <div className="tarea__esatdo">
                    {tarea.estado
                        ?
                            (
                                <button
                                type="button"
                                    className="tarea__button-completo"
                                    onClick={ () => cambiarEstado(tarea)}
                                >
                                    Completo
                                </button>
                            )
                        :   (
                                <button
                                    type="button"
                                    className="tarea__button-incompleto"
                                    onClick={() => cambiarEstado(tarea)}
                                >
                                    Incompleto
                                </button>
                        )
                    }
                </div>
                <div className="tarea__acciones">
                    <button
                        type="button"
                        className="tarea_btn-editar"
                        onClick={()=> seleccionarTarea(tarea)}
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        className="tarea_btn-eliminar"
                        onClick={ ()=>tareaEliminar(tarea._id) }
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </li>
    )
}
