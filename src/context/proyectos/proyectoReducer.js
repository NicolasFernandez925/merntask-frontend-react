import { FORMULARIO_PROYECTO, 
         OBTENER_PROYECTOS, 
         AGREGAR_PROYECTO, 
         VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL,
         ELIMINAR_PRODUCTO
        }
from '../../types'

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario:false,
                errorFormlulario: false
            }
        case VALIDAR_FORMULARIO:
             return {
                    ...state,
                    errorFormlulario: true
            }
        case PROYECTO_ACTUAL:
            
            return {
                    ...state,
                    proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }
        case ELIMINAR_PRODUCTO:
            return {
                    ...state,
                    proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                    proyecto: null
            }
        default:
            return state;
    }
}