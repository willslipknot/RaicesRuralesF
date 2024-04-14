import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';

import '../../assets/css/NavBar.css';

function NavBar() {
    const { isAuthenticated, user, signin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLoginSubmit = async (values) => {
        try {
            await signin(values);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const handleLogoClick = () => {
        if (isAuthenticated && user.tipoUser === 'admin') {
            navigate('/HomeAdmin');
        } else if (isAuthenticated && user.tipoUser === 'cliente') {
            navigate('/HomeUser');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="nav">
            <nav className="navbar">
                <ul className="navLis">
                    <div className='logo' onClick={handleLogoClick} />
                    {isAuthenticated ? (
                        <li>
                            <a href="Profile"><b className='menu'>Perfil</b></a>
                        </li>
                    ) : (
                        <li>
                            <a href='#'><b className='menu'>Contacto</b></a>
                        </li>
                    )}
                    <li>
                        <label className='labelcheck' htmlFor="menuCheckbox">
                            <b className='menu'>
                                <input type="checkbox" className='check' id="menuCheckbox" onChange={handleCheckboxChange} />
                                {isAuthenticated ? user?.username : 'Login'}
                            </b>
                        </label>
                        {isAuthenticated && (
                            <ul className="submenuUser">
                                <li>
                                    <button onClick={handleLogout}><b className='menu'>Logout</b></button>
                                </li>
                            </ul>
                        )}
                        {!isAuthenticated && (
                            <ul className="submenu">
                                <form className='login' onSubmit={handleSubmit(handleLoginSubmit)}>
                                    <div>
                                        <div className="form-group-login">
                                            <label htmlFor="username"><b className='formulario'>Nombre Usuario</b></label>
                                            <input type="text" {...register('username', { required: true })} />
                                            {
                                                errors.username && (
                                                    <p className='text-red-500'>
                                                        Nombre de usuario es requerido
                                                    </p>
                                                )
                                            }
                                        </div>
                                        <div className="form-group-login">
                                            <label htmlFor="password"><b className='formulario'>Contraseña</b></label>
                                            <input type="password" {...register('password', { required: true })} />
                                            {
                                                errors.password && (
                                                    <p className='text-red-500'>
                                                        Contraseña es requerida
                                                    </p>
                                                )

                                            }
                                        </div>
                                        <div className="form-group-login">
                                            <button className="button" type='submit'><b className='botones'>Entrar</b></button>&nbsp;&nbsp;&nbsp;
                                            <button onClick={handleRegisterClick} className="button"><b className='botones'>Registrar</b></button>
                                        </div>
                                        {
                                            erroresLogin.map((error, i) => (

                                                <div className='bg-red-500 p-0 text-white' key={i}>
                                                    {error}
                                                </div>
                                            ))
                                        }

                                    </div>
                                </form>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
