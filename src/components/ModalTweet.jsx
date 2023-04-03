import React from "react";
import './ModalTweet.css'

// componentes
import Title from "./Title";
import TweetHeader from './TweetHeader';
import Avatar from "./Avatar";

const ModalTweet = ({ modalBody }) => {
    const { text, params } = modalBody
    return(
        <section className=" modal-container">
            <div className="modal-content">
                < Title text={text} backModal />
                <ul className="modal-list">
                    {params.map(p => (
                        <li className="modal-item">
                            <Avatar avatar={p.avatar} userName={p.userName}  />
                            <TweetHeader userName={p.userName} userNickname={p.userNickname} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default ModalTweet