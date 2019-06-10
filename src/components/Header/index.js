//============ IMPORTS ============
import React from "react";
import "./header.css";

//============ CONTENT ============
const Header = (props) => (
    <header className="header" id="headerContainer">
        <div id="brand">Princess Clicker</div>
        <div id="alert">{props.alert}</div>
        <div id="scoreBoard">Score: {props.score} | High Score: {props.highScore} </div>
    </header>
);

//============ EXPORT ============
export default Header;