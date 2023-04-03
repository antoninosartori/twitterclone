import react, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import './TweetDetails.css'

// assets
import likeIcon from '../assets/icons/tw_like.svg'
import repostIcon from '../assets/icons/tw_repost.svg'


// componentes
import Title from '../components/Title'
import Avatar from '../components/Avatar'
import TweetHeader from '../components/TweetHeader'
import ModalTweet from '../components/ModalTweet'
import TweetText from '../components/TweetText'

// contexto
import { appContext } from '../context/appContext'

const twStatsItems = [
    {
        text: 'me gusta',
        icon: likeIcon,
    },
    {
        text: 'repost',
        icon: repostIcon,
    },
]

const TweetDetails = () => {
    const { initialTweets, user, openModal, handleModal, modalBody } = useContext(appContext)

    if (!user) {
        return < Navigate to={'/login'} />
    }

    const { twId } = useParams()
    const [ tweet, setTweet ] = useState(initialTweets.find( tweet => tweet.tw_id === Number(twId) ))
    

    const lineas = tweet.text.split('\n');
    const { reposts, likes, responses } = tweet

    useEffect(() => {
        const thisTweet = initialTweets.find( tweet => tweet.tw_id === Number(twId) )
        setTweet(thisTweet)
    }, [twId])

    return(
        <>
            <section className='columnPage'>
                < Title text='Tweet' backArrow={true} />
                <article className='tweetDetails-container '>
                    <div className='tweetDetails-container_header'>
                        < Avatar avatar={tweet.avatar} userName={tweet.userName} />
                        < TweetHeader userName={tweet.userName} userNickname={tweet.userNickname} />
                    </div>
                    < TweetText lineas={lineas}/>
                    <div className='tweetDetails-twStats'>
                        <ul>
                            <li>
                                <button onClick={() => {handleModal(likes, 'Me gusta')}}>
                                        <span>{likes.length}</span>
                                        <img src={likeIcon} alt="Cantidad de likes" />
                                </button>
                            </li>
                            <li>
                                <button onClick={() => {handleModal(reposts, 'repost')}}>
                                        <span>{reposts.length}</span>
                                        <img src={repostIcon} alt="Cantidad de likes" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </article>
                {
                    responses && responses.map( response => (
                        {/* en caso de pasarle un tweet, hay que agregarle la propiedad isReply={response} */}
                    ))
                }
            </section>
            { openModal &&
                < ModalTweet modalBody={modalBody} />
            }
        </>
    )
}

export default TweetDetails