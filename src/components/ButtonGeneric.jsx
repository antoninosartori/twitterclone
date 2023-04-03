import React from "react";
import './ButtonGeneric.css'

const ButtonGeneric = ({children}) => {
    return(
        <button className="buttonGeneric">{children}</button>
    )
}

export default ButtonGeneric