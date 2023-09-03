import React from "react";
import './Loading.css';
import Spinner from 'react-bootstrap/Spinner';


export default function LoadingPage() {
    return(
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}