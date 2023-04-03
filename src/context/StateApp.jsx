import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { appContext } from './appContext'

const TWEETS = [
    {
        tw_id: 1,
        avatar: 'https://pbs.twimg.com/profile_images/1229924757241581570/LF7nh_lz_400x400.jpg',
        userName: 'Antonino',
        userNickname: 'AntoninoS27',
        text: 'Tiene el mismo funcionamiento que Twitter 😋',
        responses: [],
        likes: [],
        reposts: []
    },
    {
        tw_id: 2,
        avatar: 'https://pbs.twimg.com/profile_images/1229924757241581570/LF7nh_lz_400x400.jpg',
        userName: 'Antonino',
        userNickname: 'AntoninoS27',
        text: 'Podes cambiar de avatar al momento de crear el usuario, solamente tenes que subir tu foto',
        responses: [],
        likes: [],
        reposts: []
    },
]

const StateApp = ({children}) => {
    const [initialTweets, setInitialTweets] = useState(TWEETS);
    const [ avatarSrc, setAvatarSrc] = useState('https://img.freepik.com/vector-premium/icono-camara-estilo-linea-camara-vectores_747203-402.jpg?w=826')
    const [ error, setError ] = useState('')
    const [ openModal, setOpenModal] = useState(false)
    const [ modalBody, setModalBody] = useState({})
    const navigate = useNavigate();

    // usuario
    const [user, setUser] = useState(() => {
        const isUserInLocalStorage = window.localStorage.getItem('TwitterClone_user')
        isUserInLocalStorage ? JSON.parse(isUserInLocalStorage) : null
    })

    const handleSubmitUser = (event) => {
        event.preventDefault()

        const avatar = avatarSrc
        const userName = event.target.userName.value
        const userNickname = event.target.userNickname.value

        // validaciones de campos
        if(!avatar) {
            return setError('Por favor, selecciona una imagen')
        }
        if(!userName) {
            return setError('Por favor, escribe un nombre')
        }
        if(userName.length <= 2) {
            return setError('Por favor, escribe un nombre mas largo')
        }
        if(!userNickname) {
            return setError('Por favor, escribe un nombre')
        }
        if(userNickname.length <= 2) {
            return setError('Por favor, escribe un nickname mas largo')
        }
        if(userNickname.startsWith('@')) {
            return setError(`No escribas ${userNickname}, agregamos '@' automaticamente`)
        }

        const newUser = {
            avatar,
            userName,
            userNickname
        }

        setUser(newUser)
        window.localStorage.setItem('TwitterClone_user', JSON.stringify(newUser));
        // redireccionar
        redirect("/");
    }

    // agregar o eliminar tweets
    const addTweet = (tweet) => {
        setInitialTweets( prevState => ( tweet ) )
    }

    const deleteTweet = (id) => {
        const newsTweets = initialTweets.filter(
            tw => tw.tw_id !== id
        )

        setInitialTweets(prevState => newsTweets)
    }

    // cambiar imagen
    const changeAvatar = (event) => {
        const archivo = event.target.files[0];
        const lector = new FileReader();
        lector.onload = function (event) {
            setAvatarSrc(event.target.result);
        }
        lector.readAsDataURL(archivo);
    }

    // navegacion
    const handleBack = (event) => {
        event.preventDefault()
        navigate(-1);
    }

    // modal
    const handleModal = (params, text) => {
        setOpenModal(!openModal)
        setModalBody({params, text})
        console.log(openModal)
    }

    return(
        <appContext.Provider 
        value={{ 
            initialTweets, addTweet, avatarSrc, changeAvatar, user, setUser, handleSubmitUser, error, deleteTweet, setInitialTweets, handleBack, handleModal, openModal, modalBody, setOpenModal
         }}>
            {children}
        </appContext.Provider>
    )
}

export default StateApp