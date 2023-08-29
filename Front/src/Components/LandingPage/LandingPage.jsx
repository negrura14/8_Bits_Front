import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

const Header = () => {
  return (
    <div className="landing-page">
      <div className="fire"></div>
      <div className="content">
        <h1>8 - Bits </h1>
        <p>Sumergete en el mundo Gamer</p>
      <Link to={'/home'}>
        <button className="btn-primary">START</button>
      </Link>
      </div>
    </div>
  );
};

export default Header;