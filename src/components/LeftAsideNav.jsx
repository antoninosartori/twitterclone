import React, { useContext, useState } from "react";
import './LeftAsideNav.css'

// icons
import  twLogo  from '../assets/icons/tw_logo.svg'
import  twHome  from '../assets/icons/tw_home.svg'
import  twHash  from '../assets/icons/tw_hash.svg'
import  twNotification  from '../assets/icons/tw_notification.svg'
import  twMessage  from '../assets/icons/tw_message.svg'
import  twSaved  from '../assets/icons/tw_saved.svg'
import  twProfile  from '../assets/icons/tw_profile.svg'
import  twOptions  from '../assets/icons/tw_options.svg'

// constantes
const navItems = [
    {
        id: 'navItem_1',
        icon: twLogo,
        path: '/'
    },
    {
        id: 'navItem_2',
        text: 'inicio',
        icon: twHome,
        path: '/'
    },
    {
        id: 'navItem_8',
        text: 'explorar',
        icon: twHash,
        path: '/explore'
    },
    {
        id: 'navItem_3',
        text: 'notificaciones',
        icon: twNotification,
        path: '/notifications'
    },
    {
        id: 'navItem_4',
        text: 'mensajes',
        icon: twMessage,
        path: '/messages'
    },
    {
        id: 'navItem_5',
        text: 'guardados',
        icon: twSaved,
        path: '/bookmarks'
    },
    {
        id: 'navItem_6',
        text: 'perfil',
        icon: twProfile,
        path: '/AntoninoS27'
    },
    {
        id: 'navItem_7',
        text: 'mas opciones',
        icon: twOptions,
        path: '/options'
    },
]

// componentes
import NavItem from "./NavItem";
import Avatar from "./Avatar";
import ButtonGeneric from './ButtonGeneric'

// contexto
import { appContext } from "../context/appContext";

const LeftAsideNav = () => {
    const { user, setUser} = useContext(appContext)
    const [ isToggle, setIsToggle ] = useState(false)

    const toggleOptions = () => {
        setIsToggle(!isToggle)
    }

    const closeSession = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('TwitterClone_user')
        setUser(null)
    }

    return(
        <aside className="aside-nav">
            <div className="aside-nav__upContainer">
                <ul>
                    {
                        navItems.map(item => (
                            <NavItem key={item.id} icon={item.icon} path={item.path} text={item.text}/>
                        ))
                    }
                </ul>
            </div>
            <div className="aside-nav__downContainer">
                {
                    user 
                        ? 
                            <article>
                                <Avatar avatar={user.avatar} />
                                <div className="aside-nav__userInfo">
                                    <h3 className="userName">{user.userName}</h3>
                                    <span className="userNickname">{`@${user.userNickname}`}</span>
                                </div>
                                <button  onClick={toggleOptions} className="aside-nav__optionBtn-container">
                                    <img src={twOptions} alt="opciones de la cuenta" />
                                </button>
                                {
                                    isToggle && 
                                        <form onSubmit={closeSession} className="toggleOptions-container">
                                            <ButtonGeneric >Cerrar sesion</ButtonGeneric>
                                        </form>
                                }
                            </article>
                        : null
                }
            </div>

        </aside>
    )
}

export default LeftAsideNav