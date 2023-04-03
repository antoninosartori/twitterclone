import React from "react";

const TweetText = ({lineas}) => {
    return(
        <div className="tweet-body_content">
            <p>{lineas.map((linea, idx) => <span key={linea.idx}>{linea}</span>)}</p>
        </div>
    )
}

export default TweetText