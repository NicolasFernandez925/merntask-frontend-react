import React, {useContext, useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'
import authContext from '../../context/autenticacion/authContext'


export const RutaPrivada = ({ component: Component, ...props}) => {

    const autenticacionContext = useContext(authContext);
    const { autenticado, usuarioAutenticado, cargando } = autenticacionContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return (
       <Route { ...props } render = { props => !autenticado && !cargando ? (
            <Redirect to = '/' />
       ) : (
            <Component { ...props } />
       ) }
            
       />
    );
} 
