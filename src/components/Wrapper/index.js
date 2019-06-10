//============ IMPORTS ============
import React from "react";
import Container from "react-bootstrap/Container";
import "./wrapper.css";

//============ CONTENT ============
const Wrapper = (props) => (
    <Container className="wrapper">
        {props.children}
    </Container>
);

//============ EXPORT ============
export default Wrapper;