import React from "react";
import './Avatar.css'
const Avatar = ({avatar, userName}) => {
    return(
        <aside className="tweet-avatar">
            <img src={avatar} alt={`foto de perfil del usuario ${userName}`} />
        </aside>
    )
}

export default Avatar