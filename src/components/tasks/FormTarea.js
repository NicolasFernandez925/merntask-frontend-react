import React, {useContext, useEffect, useState} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContex';

export const FormTarea = () => {
    
    // extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTarea, actualizarTarea } = tareasContext;


    // state del formulario
    const [tarea, guardarTarea] = useState({
            nombre: ''
    });
       
    // effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada)
        }
        else{
            guardarTarea(
                {nombre: ''}
            )
        }
       
    }, [tareaSeleccionada])



    // extraer nombre del proyecto
    const {nombre} = tarea;

    // si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;

    // leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        

        //validar
        if(nombre.trim() === ''){ 
            validarTarea();
            return;
        }

        // Si es edicion o si es nueva tarea
        if(tareaSeleccionada === null){
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
            
        }else{
            // actualizar tarea existente
            actualizarTarea(tarea);
        }

        // obtener y filtrar las tareas del proyecto actual
        obtenerTarea(proyectoActual._id);

        // reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return (
        <div className="tarea__formulario">
           <form 
                className="mt-3"
                onSubmit={onSubmit}
            >
                <div className="tarea__contenedor-input">
                    <input 
                        type="text"
                        className="tarea__input"
                        placeholder="Nombre tarea"
                        autoComplete="false"
                        name="nombre"
                        value={nombre}  
                        onChange={handleChange}         
                    />
                </div>
                <div className="tarea__contenedor-input">
                    <input 
                        type="submit"
                        className="tarea__btn-submit"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}      
                    />
                </div>
                {errorTarea 
                ? 
                <p className="mt-3 tarea__error-msg">El nombre de la tarea es obligatorio</p> 
                : null}
           </form>
        </div>
    )
}
