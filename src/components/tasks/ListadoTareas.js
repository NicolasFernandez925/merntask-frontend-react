import React, {Fragment, useContext} from 'react'
import { Tarea } from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContex';


export const ListadoTareas = () => {

    // extraer los proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // extraer las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto, loading } = tareasContext;

    // si no hay proyecto seleccionado
    if(!proyecto) return <h2 className="tarea__title">Selecciona un proyecto</h2>;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // elimina un proyecto
    const onclickEliminar = () =>{
        eliminarProyecto(proyectoActual._id);
    }

    return (
        <Fragment>
            <h2 className="tarea__title-listadoProyecto">Proyecto: {proyectoActual.nombre}</h2>

            <div className="row container-fluid no-gutters">

                {
                    (loading) ?
                          (loading) && (<img className="tarea__loading-gif" src="../../loading.gif"></img>)
                    :
                    (
                        <div className="col-12 col-md-8 offset-md-2 ">
                        <ul className="tarea__listado-tareas">
                            { (tareasProyecto.length === 0)   
                                ? (<li className="tarea"><p>No hay tareas</p></li>)
                                : tareasProyecto.map( tarea => (
                                <Tarea 
                                        key={tarea._id}
                                        tarea={tarea}
                                />
                                ))
                            }
                        </ul>
                    </div>
                    )
                }
              
                <div className="col-12 col-md-8 offset-md-2 mt-4">
                    <button
                        type="button"
                        className="tarea__btn-eliminar-proyecto"
                        onClick={onclickEliminar}
                    >
                    Eliminar proyecto &times;
                    </button>
                </div>
            </div>
        </Fragment>
    )
}
