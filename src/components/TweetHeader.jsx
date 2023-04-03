import React from "react";
import './TweetHeader.css';

const TweetHeader = ({userName, userNickname}) => {
    return (
        <div className="tweet-body_header">
            <h3 className="tweet-body_header_userName">{userName}</h3>
            <span className="tweet-body_header_userNickname">@{userNickname}</span>
        </div>
    )
}

export default TweetHeader