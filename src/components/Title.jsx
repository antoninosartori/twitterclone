import React, { useContext } from "react";

// assets
import backArrowIcon from '../assets/icons/tw_backArrow.svg'

// contexto
import { appContext } from "../context/appContext";

const Title = ({ text, backArrow, backModal,  onlyTitle }) => {
    const { handleBack, handleModal } = useContext(appContext)
    let handleFunction
    if(backArrow) {
        handleFunction = handleBack
    }
    if(backModal) {
        handleFunction = handleModal
    }

    if (onlyTitle) {
        return <div className="title-container"><h1 className="title">{text}</h1></div>

    } else {
        return (
            <div className="title-container">
                <button onClick={handleFunction} className="backArrow"> <img src={backArrowIcon} alt="volver atras" /> </button>
                <h1 className="title">{text}</h1>
            </div>
        )
        
    }
}

export default Title