import React, { useContext, useEffect, useState } from "react";
import './Tweet.css'

// componentes
import Avatar from "./Avatar";
import TweetText from "./TweetText";
import TweetHeader from "./TweetHeader";
import WriteTweet from "./WriteTweet";
import ButtonGeneric from "./ButtonGeneric"

// icons
import replyIcon from '../assets/icons/tw_reply.svg'
import repostIcon from '../assets/icons/tw_repost.svg'
import likeIcon from '../assets/icons/tw_like.svg'
import shareIcon from '../assets/icons/tw_share.svg'
import deleteIcon from '../assets/icons/tw_delete.svg'

// contexto
import { appContext } from "../context/appContext";
import { Link } from "react-router-dom";

const Tweet = ({tw_id, avatar, userName, userNickname, text, isReply }) => {

    // si es una respuesta deberian incializarse haciendo el find del propio tweet, y no del array principal de tweets

    const { deleteTweet, user, initialTweets } = useContext(appContext)
    const [ tweetLikes, setTweetLikes] = useState(initialTweets.find(tw => tw.tw_id === tw_id).likes)
    const [ tweetResponses, setTweetResponses] = useState(initialTweets.find(tw => tw.tw_id === tw_id).responses)
    const [ tweetReposts, setTweetReposts] = useState(initialTweets.find(tw => tw.tw_id === tw_id).reposts)
    const [ openReply, setOpenReply] = useState(false)
    const isOwner = user.userName === userName && user.userNickname === userNickname && user.avatar === avatar
    const thisTweet = initialTweets.find(tw => tw.tw_id === tw_id)
    const lineas = text.split('\n');
//       💡 Se podria usar un solo useState con un array de objetos para tener los likes, responses y reposts de este tweet
//          const thisTweet = isReply ?? initialTweets.find(tw => tw.tw_id === tw_id)
//          const [thisTweetInitialState, setThisTweetInitialState] = useState(
//          [{twLikes: thisTweet.likes},
//          {twResponses: thisTweet.responses},
//          {twReposts: thisTweet.reposts}])

//          const {twLikes,twResponses,twReposts} = thisTweetInitialState

//          useEffect(() => {
//              thisTweet.likes = tweetLikes
//              thisTweet.responses = tweetResponses
//              setThisTweetInitialState([])
//          }, [tweetLikes, tweetResponses])

    const handleDeleteTweet = () => {
        deleteTweet(tw_id)
    }

    useEffect(() => {
        thisTweet.likes = tweetLikes
        thisTweet.responses = tweetResponses
    }, [tweetLikes, tweetResponses])
    
    const handleLike = (event) => {
        event.preventDefault();

        const isAlreadyLiked = thisTweet.likes.find( like => like.userName === user.userName && like.userNickname === user.userNickname)

        if(isAlreadyLiked) {
            const filterLikes = thisTweet.likes.filter(like => like.userName !== user.userName && like.userNickname !== user.userNickname)
            setTweetLikes(filterLikes)
            return
        }

        const newLike = {
            avatar: user.avatar,
            userName: user.userName,
            userNickname: user.userNickname
        }

        const newslikes = [...tweetLikes, newLike]
        setTweetLikes(newslikes)
    }

    const handleResponse = (event, tweetText) => {
        event.preventDefault()

        const tweetReplied = {
            tw_id: Math.random(),
            avatar,
            text: tweetText,
            userName,
            userNickname,
            responses: [],
            likes: [],
            reposts: []
        }
        const newsResponses = [...tweetResponses, tweetReplied]
        setTweetResponses(newsResponses)
        setOpenReply(false)
    }

    const handleReply = (event) => {
        event.preventDefault();
        setOpenReply(!openReply)
    } 

    const likedButtonClassName = tweetLikes.length > 0 ? 'liked' : ''
    const replyButtonClassName = tweetResponses.length > 0 ? 'replied' : ''
    const repostButtonClassName = tweetReposts.length > 0 ? 'reposted' : ''


    return(
        <article className="tweet-container">
            {
                isOwner &&
                <button className="tweet-deleteBtn" onClick={handleDeleteTweet}>
                    <img src={deleteIcon} alt="eliminar tweet" />
                </button>
            }
            <Link to={`/${tw_id}`}>
                < Avatar avatar={avatar} userName={userName} />
                <div className="tweet-body">
                    <TweetHeader userName={userName} userNickname={userNickname} />
                    <TweetText lineas={lineas}/>
                    <div className="tweet-body_footer">
                        <button className={replyButtonClassName} onClick={handleReply} >
                            <img src={replyIcon} alt="reply" />
                            {tweetResponses.length > 0 &&
                                <span className="tweet-body_footer__number">{tweetResponses.length}</span>
                            }
                        </button>
                        <button className={repostButtonClassName}>
                            <img src={repostIcon} alt="repost" />
                        </button>
                        <button className={likedButtonClassName} onClick={handleLike}>
                            <img src={likeIcon} alt="like" />
                            {tweetLikes.length > 0 &&
                                <span className="tweet-body_footer__number">{tweetLikes.length}</span>
                            }
                        </button>
                        <button>
                            <img src={shareIcon} alt="share" />
                        </button>
                    </div>
                </div>
            </Link>
            {openReply &&
                <WriteTweet isReply handleResponse={handleResponse} />
            }
        </article>
    )
}

export default Tweet

{/* <form className="reply-container" onSubmit={handleReply}>
                    <textarea placeholder="Escribe tu respuesta" name="reply" cols="30" rows="3"></textarea>
                    <ButtonGeneric>Responder</ButtonGeneric>
                </form> */}