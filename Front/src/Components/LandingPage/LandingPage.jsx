import React from 'react';
import { Link } from 'react-router-dom';
import {ROUTES} from '../../Helpers/RoutesPath'
import './LandingPage.css'

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="fire"></div>
      <div className="content">
        <h1>8 - Bits </h1>
        <p>Immerse yourself in the gaming world</p>
      <Link to={ROUTES.HOME}>
        <button className="btn-primary">START</button>
      </Link>
      </div>
    </div>
  );
};

export default Landing;