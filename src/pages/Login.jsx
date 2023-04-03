import React, { useContext, useEffect } from "react";
import './Login.css'

// componentes
import Avatar from "../components/Avatar";
import ButtonGeneric from "../components/ButtonGeneric";
import Title from "../components/Title";

// contexto
import { appContext } from "../context/appContext";
import { Navigate } from "react-router-dom";



const Login = () => {
    const { user, setUser, avatarSrc, changeAvatar, handleSubmitUser, error } = useContext(appContext)
    
    useEffect(() => {
        setUser(prevState => JSON.parse(window.localStorage.getItem('TwitterClone_user'))) 
    }, [])

    if(user) {
        return < Navigate to={'/'} />
    }
    
    return(
        <section className="login-container">
            <form className="login-container_form" onSubmit={handleSubmitUser}>
                <Title text='Creemos un usuario'/>
                <div className="login-container_groupInputs">
                    <input autoComplete="off" type="text" name="userName" placeholder="Nombre de usuario" />
                    <input autoComplete="off" type="text" name="userNickname" placeholder="@Nickname" />
                    <div className="login-container_changeAvatar-container">
                        <Avatar avatar={avatarSrc} />
                        <input id="login-container__changeAvatar" type="file" name="avatar" onChange={changeAvatar} />
                    </div>
                </div>
                <ButtonGeneric >Crear usuario</ButtonGeneric>
                { error && <span>{error}</span> }
            </form> 
        </section>
    )
}

export default Login