import { 
        REGISTRO_EXITOSO, 
        REGISTRO_ERROR,
        OBTENER_USUARIO,
        LOGIN_EXITOSO,
        LOGIN_ERROR,
        CERRAR_SESION,
        LOADING_USUARIO
        } 
from "../../types";


export default (state, action) => {

    switch (action.type) {
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                loading: false,
                mensaje: null,
                cargando: true
            }
        
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
        case CERRAR_SESION:

            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                loading: false,
                mensaje: action.payload,
                usuario: null,
                autenticado: null,
                cargando: false
            }

        case LOADING_USUARIO:
            return{
                ...state,
                loading: true
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado : true,
                loading: false,
                usuario: action.payload,
                cargando: false
            }
        
        default:
            return state;
    }
}