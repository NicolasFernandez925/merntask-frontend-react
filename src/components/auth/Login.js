import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import alertContext from '../../context/alertaContext';
import authContext from '../../context/autenticacion/authContext';

export const Login = ({history}) => {

  // extraer los valores del context
  const alertaContext = useContext(alertContext);
  const {alerta, mostrarAlerta} = alertaContext;

  const autenticacionConontext = useContext(authContext);
  const { mensaje, autenticado, iniciarSesion, loading } = autenticacionConontext;

  const [usuario, guardarUsuario] = useState({
      email: '',
      password: ''
  });

  // en caso de que el password o usuario no exista
  useEffect(() => {

    if(autenticado){
        history.push('/proyectos');
    }

    if(mensaje){
        mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

  }, [mensaje, autenticado, history]);

  const { email, password } = usuario;

  const onSubmit = e => {

      e.preventDefault();
      
      // validar que no haya campos vacios
      if(email.trim() === '' || password.trim() === ''){
        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        return;
      }
      
      // pasarlo al action
      iniciarSesion({email, password});
  }

  const handleInputChange = ({target}) => {
          guardarUsuario({
            ...usuario,
            [target.name] : target.value
          })

  }

  return (
    <div className="container-fluid login__contenedor">
      <div className="login__logo">
        <img className="logo-img" src="../../logo.gif" alt="logo tasks" />
        <span className="logo- d-none d-md-block">MERNtasks</span>
      </div>
      <div className="row login__container_form">
        <div className="col-12 col-md-6 form__content">
          <div className="contendt-form">
          <h2 className="login__title">Iniciar sesión</h2>
          <form 
              className="login__form"
              onSubmit={onSubmit}
          >     
            <div className="form__input">
                <i className="far fa-user"></i>
                <input
                type="email"
                className="form__input-login"
                placeholder="Tu email"
                name="email"
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
                />
            </div>
            <div className="form__input">
                <i className="fas fa-key"></i>
                <input
                type="password"
                className="form__input-login"
                placeholder="Tu contraseña"
                name="password"
                autoComplete="off"
                value={password}
                onChange={handleInputChange}
                />
            </div>
            <input
                type="submit"
                className="form__input-submit "
                value="Iniciar sesión"
            />
            {
                  (loading) && (<img className="register__loading-gif" src="../../loading.gif"></img>)
            }
          </form>
          { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <Link 
                to="/nueva-cuenta"
                className="login__crear-cuenta"              
              >
              Crear una cuenta
            </Link> 
          </div>
        </div>
        <div className="col-12 col-md-6 login__contenedor-img d-none d-md-block">
          <img
            src="../../img-abstracta-login.jpg"
            className="login__imagen"
            alt="imagen login"
          />
        </div>
      </div>
    </div>
  );
};
