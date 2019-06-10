//============ IMPORTS ============
import React from "react";
import "./card.css";

//============ CONTENT ============
const Card = (props) => (
    <div className="card m-4 float-left">
        <img className="card-img-top"
        alt="princess" 
        src={props.image} 
        onClick={() => props.handleClickEvent(props.name)}
        id={props.name} />
    </div>
);

//need to add onclick when functional

//============ EXPORT ============
export default Card;