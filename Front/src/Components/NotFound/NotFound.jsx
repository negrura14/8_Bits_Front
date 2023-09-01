import React from "react";
import './NotFound.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Helpers/RoutesPath';
import Button from 'react-bootstrap/Button';

export default function NotFound(){
    return(
        <div className='container'>
            <Link to={ROUTES.HOME}>
                <Button className="btn" variant="primary" size="lg">Back to Home</Button>{' '}
            </Link>
            <h1 className='h1'>404</h1>
            <h2 className='h2' >Game Over: 404 Not Found</h2>
        </div>
    )
}