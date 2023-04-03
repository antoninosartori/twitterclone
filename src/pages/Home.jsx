import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import './Home.css'

// componentes
import Tweet from "../components/Tweet";
import Title from "../components/Title";
import WriteTweet from "../components/WriteTweet";

// icons
import searchIcon from '../assets/icons/tw_search.svg'

// contexto
import { appContext } from "../context/appContext";

const Home = () => {
    const { initialTweets, user, setUser} = useContext(appContext)

    useEffect(() => {
        setUser(prevState => JSON.parse(window.localStorage.getItem('TwitterClone_user'))) 
    }, [])

    if (!user) {
        return < Navigate to={'/login'} />
    }

    return(
        <>  
            <section className="home-tweetContainer columnPage">
                <Title text='Inicio' onlyTitle/>

                <div className="home-tweetContainer_writeTweetContainer">
                    < WriteTweet  />
                </div>
                
                {
                    initialTweets?.map( tweet => (
                        < Tweet 
                            key={tweet.tw_id}
                            tw_id={tweet.tw_id}
                            avatar={tweet.avatar}
                            userName={tweet.userName}
                            userNickname={tweet.userNickname}
                            text={tweet.text}
                            
                            />
                    )).reverse()
                }
            </section>
            <section className="home-whatHappend">
                <form >
                    <div className="formGroup">
                        <img src={searchIcon} alt="" />
                        <input type="text" placeholder="Buscar en Twitter" />
                    </div>
                </form>
            </section>
        </>
    )
}

export default Home