import React, {Fragment, useContext, useState} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';

export const NuevoProyecto = () => {

    // obtener el state del formulario
    // useContext es como el useSelector de Redux
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const onChangeProyecto = ({target}) => {
        guardarProyecto({
            ...proyecto,
            [target.name]: target.value
        })
    }

    const {nombre} = proyecto;

    const onSubmitProyecto = (e) => {
        e.preventDefault();

        // validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }
        // agregar proyecto 
        agregarProyecto(proyecto);

        // reiniciar form
        guardarProyecto({
            nombre:''
        })
    }
    
    return (
        <Fragment>
            <button
            type="button"
            className="proyecto__button"
            onClick ={() => mostrarFormulario() }
            >
                Nuevo proyecto
            </button>

            {
                formulario ?
                    (
                        <form 
                            className="proyecto__form-proyecto" 
                            onSubmit={onSubmitProyecto} 
                        >
                            <input 
                                type="text"
                                className="proyecto__input"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                autoComplete="off"
                                value={nombre}
                                onChange={onChangeProyecto}
                            />
                            <input 
                                type="submit"
                                className="proyecto__input-submit"
                                value="Agregar Poryecto"
                            />
                        </form>
                    ) : null
            }
            {errorFormulario 
                    ? 
                    <p className="proyecto__error-form">El nombre del proyecto es obligatorio</p>          
                    : null}
        </Fragment>
    )
}
