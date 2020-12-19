import React, { useContext, useEffect } from 'react'
import { Barra } from '../layout/Barra'
import { Sidebar } from '../layout/Sidebar'
import { FormTarea } from '../tasks/FormTarea'
import { ListadoTareas } from '../tasks/ListadoTareas'
import authContext from '../../context/autenticacion/authContext'


export const Proyectos = () => {

    // extraer la informacion de autenticacion
    const autenticacionContext = useContext(authContext);
    const { usuarioAutenticado } = autenticacionContext;

    useEffect(() => {
       usuarioAutenticado();
    }, [])

    return (
        <div className="container-fluid proyectos__contenedor-app ">
            <div className="row no-gutter">
              <div className="col-12 col-md-4 proyectos__aside text-center">
                 <Sidebar/>
              </div>
              <div className="col-12 col-md-8 proyectos__bg">
                  <div className="proyectos__main">
                      <Barra/>
                      <main>
                          <FormTarea />
                          <div className="proyectos__contenedor-tareas">
                             <ListadoTareas />
                          </div>
                      </main>
                  </div>
              </div>
            </div>
        </div>
    )
}
