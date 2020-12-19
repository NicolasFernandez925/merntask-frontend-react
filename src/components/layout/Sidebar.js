import React from 'react'
import { ListadoProyectos } from '../proyectos/ListadoProyectos'
import { NuevoProyecto } from '../proyectos/NuevoProyecto'

export const Sidebar = () => {
    return (
        <aside>
            <img 
                src="../../logo.gif" 
                alt=""
                className="sidebar__logo"
            />
            <h2><span className="proyectos__spanTtile-sidebar">M</span>ERN tasks</h2>
            <NuevoProyecto/>

            <div className="proyectos">
                <h4 className="proyectos__title-proyectos">Tus proyectos</h4>
                <ListadoProyectos />
            </div>
           
        </aside>
    )
}
