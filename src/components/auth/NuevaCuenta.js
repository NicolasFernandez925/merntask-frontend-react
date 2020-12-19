import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import alertContext from '../../context/alertaContext';
import authContext from '../../context/autenticacion/authContext';

export const NuevaCuenta = ({history}) => {

  // extraer los valores del context
  const alertaContext = useContext(alertContext);
  const {alerta, mostrarAlerta} = alertaContext;

  const autenticacionConontext = useContext(authContext);
  const { mensaje, autenticado, registrarUsuario, loading } = autenticacionConontext;

  // en caso de que el usuario se haya autenticado o registrado o sea un registro
  // duplicado
  useEffect(() => {

      if(autenticado){
          history.push('/proyectos');
      }

      if(mensaje){
          mostrarAlerta(mensaje.msg, mensaje.categoria);
      }

  }, [mensaje, autenticado, history]);


  const [user, setUser] = useState({
    nombre: '',
    password: '',
    repass: '',
    email: ''
  });

  const {nombre, password, repass, email } = user;

  const handleInputChange = ({target}) => {
        setUser({
            ...user,
            [target.name] : target.value
        })
  }

  const onSubmit = e => {
    
    e.preventDefault();
    if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || repass.trim() === ''){
          mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
          return;
    }

    // password minimo de 6 caracteres
    if(password.length < 6){
      mostrarAlerta('El password debe tener al menos 6 carácteres', 'alerta-error');
      return;
    }
    if(password !== repass){
      mostrarAlerta('Las contraseñas no son iguales', 'alerta-error');
      return;
    }

    // Pasarlo al action
    registrarUsuario({
        nombre,
        email,
        password
    })
  }


  return (
    <div className="container-fluid login__contenedor">
      <div className="login__logo">
        <img className="logo-img" src="../../logo.gif" alt="logo tasks" />
        <span className="logo-title">MERNtasks</span>
      </div>
      <div className="row login__container_form">
        <div className="col-12 col-md-6 form__content">
          <div className="contendt-form">
          <h2 className="login__title">Registrate</h2>
          <form 
                  className="login__form"
                  onSubmit={onSubmit}
              >     
                <div className="form__input">
                    <i className="far fa-user"></i>
                    <input
                    type="text"
                    className="form__input-login"
                    placeholder="Tu nombre"
                    name="nombre"
                    autoComplete="off"
                    value={nombre}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form__input">
                    <i className="far fa-envelope"></i>
                    <input
                    type="email"
                    className="form__input-login"
                    placeholder="Tu email"
                    name="email"
                    value={email}
                    autoComplete="off"
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
                <div className="form__input">
                    <i className="fas fa-key"></i>
                    <input
                    type="password"
                    className="form__input-login"
                    placeholder="Repeti tu contraseña"
                    name="repass"
                    value={repass}
                    autoComplete="off"
                    onChange={handleInputChange}
                    />
                </div>
                <input
                  type="submit"
                  className="form__input-submit "
                  value="Registrate"
                />
                {
                  (loading) && (<img className="register__loading-gif" src="../../loading.gif"></img>)
                }
              </form>
              { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
              <Link 
                  to="/"
                  className="login__crear-cuenta"              
                >
                Volver al login
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
}


