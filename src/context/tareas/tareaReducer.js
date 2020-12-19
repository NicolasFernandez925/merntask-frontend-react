import {
        TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LOADING_TAREA
} 
from '../../types'


export default (state, action) => {
    switch (action.type) {

        case TAREAS_PROYECTO:
            return {
                ...state,
                loading: false,
                tareasProyecto: action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                loading: false,
                tareasProyecto: [action.payload, ...state.tareasProyecto, ],
                errorTarea: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                loading: false,
                tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                loading: false,
                tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
                tareaSeleccionada: null

            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        case LOADING_TAREA:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
}