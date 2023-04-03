import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../context/appContext";
import './WriteTweet.css'

// componentes
import Avatar from "./Avatar";
import TweetHeader from "./TweetHeader";
import ButtonGeneric from "./ButtonGeneric";

const WriteTweet = ({isReply, handleResponse}) => {
    const { user, initialTweets, addTweet } = useContext(appContext)
    const { avatar, userName, userNickname} = user

    const handleAddTweet = (event) => {
        event.preventDefault()
        const tweetText = event.target.tweetWritted.value;
        if(!tweetText){
            return
        }

        if(!isReply) {
            
            const idMap = initialTweets.map(tw => tw.tw_id)
            const id = idMap.length

            const tweetWritted = {
                tw_id: id + 1,
                avatar,
                text: tweetText,
                userName,
                userNickname,
                responses: [],
                likes: [],
                reposts: []
            }
    
            const newsTweets = [...initialTweets, tweetWritted ]
            
            addTweet(newsTweets)
            event.target.tweetWritted.value = ''
        }

        if(isReply) {
            handleResponse(event,tweetText)
        }
    }

    const buttonText = !isReply ? 'Twitear' : 'Responder'
    const className = !isReply ? 'writeTweet-container' : 'writeTweet-container replyTweet-container'
    const placeholder = !isReply ? '¿Que esta pasando?' : 'Escribe tu respuesta'

    return(
        <form className={className} onSubmit={handleAddTweet} >
            <Avatar avatar={avatar} userName={userName} />
            <div className="inputContainer">
                {!isReply && 
                    <TweetHeader userName={userName} userNickname={userNickname}/>
                }
                <textarea autoComplete="off" placeholder={placeholder} name="tweetWritted" />
                <ButtonGeneric>{buttonText}</ButtonGeneric>
            </div>
        </form>
    )
}

export default WriteTweet