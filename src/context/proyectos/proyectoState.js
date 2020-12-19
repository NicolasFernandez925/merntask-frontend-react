import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import { 
        FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PRODUCTO 
} from '../../types'
import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario : false,
        errorFormlulario: false,
        proyecto: null
    }
    
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Obtener proyectos
    const obtenerProyectos = async () => {

        try {

            const resultado =  await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
            
        } catch (error) {
            console.log(error);
        }
      
    }

    // agregar nuevo proyecto
    const agregarProyecto = async proyecto =>{
       try {

            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })

       } catch (error) {
           console.log(error);
       }
       
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO,
        })
    }

    // selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId 
        })
    }

    // elimina un proyecto
    const eliminarProyecto = async proyectoId => {
      
        try {
            
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PRODUCTO,
                payload: proyectoId
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <proyectoContext.Provider
            value ={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormlulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;