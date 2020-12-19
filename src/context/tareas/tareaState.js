import React, { useReducer } from 'react'
import tareaContext from './tareaContex'
import tareaReducer from './tareaReducer'

import 
    {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LOADING_TAREA
    } 
from '../../types'
import clienteAxios from '../../config/axios'


const TareaState = props =>{

    const initialState = {

        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null,
        loading: false
    }

    const [state, dispatch] = useReducer(tareaReducer, initialState)

    // obtener tareas del proyecto
    const obtenerTarea = async proyecto =>{

       try {

        // cargando tareas
        dispatch({
            type: LOADING_TAREA
        });
           
        const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
        dispatch({
            type: TAREAS_PROYECTO,
            payload: resultado.data.tareas
        });
       } catch (error) {
           console.log(error);

       }
    }

    // agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
       
        try {

         const resultado = await clienteAxios.post('/api/tareas', tarea)
        
         dispatch({
            type: AGREGAR_TAREA,
            payload: resultado.data.tarea
         })
        } catch (error) {
            console.log(error);
        }
    }

    // calida y muestra un error en caso que se necesario

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
       try {
           
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
       } catch (error) {
            console.log(error);
       }
    }


    // extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // edita o modifica una tarea
    const actualizarTarea = async tarea => {
        try {

            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
           
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <tareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                loading: state.loading,
                obtenerTarea,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea   
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;